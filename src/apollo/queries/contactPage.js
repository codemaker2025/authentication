import { gql } from "@apollo/client";

const GET_CONTACT_PAGE = gql`
  query GetContactPage {
    contactUsPage {
      title
      description
      meta_title
      meta_keywords
      meta_description
      right_side_content {
        type
        name
        street
        city
        id
        link
        link_label
        phone
        email
        socialLinks {
          id
          link
          svg_text
          title
        }
      }
    }
  }
`;

export default GET_CONTACT_PAGE