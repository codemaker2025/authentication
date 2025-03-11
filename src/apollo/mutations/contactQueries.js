import { gql } from "@apollo/client";

const CONTACT_US_FORM_MUTATION = gql`
  mutation contactUsFormMutaion(
    $request_type: String!
    $email: String!
    $name: String!
    $telephone: String!
    $orderNumber: String
    $comment: String!
    $productSku: String!
  ) {
    submitContactForm(
      input: {
        request_type: $request_type
        email: $email
        name: $name
        telephone: $telephone
        order_number: $orderNumber
        comment: $comment
        product_sku: $productSku
      }
    )
  }
`;

export default CONTACT_US_FORM_MUTATION