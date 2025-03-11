import { gql } from "@apollo/client";
import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Spinner,
  Card,
} from "react-bootstrap";

const GET_MEASURE_YOUR_SPACE = gql`
  query measureYourSpace {
    MeasureYourSpacePageCms {
      content
      __typename
    }
  }
`;

const Home = () => {
  const [getMeasureYourSpace, { data, loading, error, called }] = useLazyQuery(
    GET_MEASURE_YOUR_SPACE,
    {
      fetchPolicy: "network-only",
    }
  );

  if (!called) {
    getMeasureYourSpace();
  }

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  const blocks = JSON.parse(data.MeasureYourSpacePageCms.content);

  return (
    <Container className="py-5">
      <h1 className="my-4 text-center text-primary">Measure Your Space</h1>
      {blocks.map((block, index) => {
        switch (block.block_type) {
          case "video_with_image_block":
            return (
              <Row key={index} className="mb-5 align-items-center">
                <Col md={12} className="text-center mt-3">
                  <p>{block.text_above_the_image}</p>
                  <Button
                    href={block.video_link}
                    variant="outline-primary"
                    size="lg"
                  >
                    {block.video_button_text}
                  </Button>
                </Col>
                <Col md={12} className="text-center mt-4">
                  <Image
                    src={block.images.desktop}
                    alt={block.alt}
                    fluid
                    rounded
                    className="shadow-lg"
                  />
                </Col>
              </Row>
            );

          case "image_with_paragraph":
            return (
              <Row key={index} className="mb-5 align-items-center">
                <Col md={6} className="d-flex justify-content-center">
                  <Image
                    src={block.images.desktop}
                    alt={block.alt}
                    fluid
                    rounded
                    className="shadow-sm"
                  />
                </Col>
                <Col
                  md={6}
                  className="d-flex flex-column justify-content-center"
                >
                  <h3 className="text-primary">{block.name_1}</h3>
                  <p>{block.description_1}</p>
                </Col>
              </Row>
            );

          case "svg_block":
            return (
              <Row key={index} className="mb-5">
                {block.content.map((svgItem) => (
                  <Col key={svgItem.id} md={4} className="text-center">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: svgItem.svg_text,
                      }}
                      className="mb-3"
                    />
                    {svgItem.description && (
                      <p className="text-muted">{svgItem.description}</p>
                    )}
                  </Col>
                ))}
              </Row>
            );

          default:
            return null;
        }
      })}
    </Container>
  );
};

export default Home;
