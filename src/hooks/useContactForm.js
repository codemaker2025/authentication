import { useMutation, useQuery } from '@apollo/client';
import CONTACT_US_FORM_MUTATION from "../apollo/mutations/contactQueries.js";
import GET_CONTACT_PAGE from "../apollo/queries/contactPage.js";
import React from 'react'
import toast from 'react-hot-toast';

export default function useContactForm() {
    const { loading, error, data } = useQuery(GET_CONTACT_PAGE, {
        fetchPolicy: 'cache-first'
    });
    const [
        submitContactForm,
        { loading: mutationLoading, error: submitError }
    ] = useMutation(CONTACT_US_FORM_MUTATION, {
        onCompleted: () => {
            console.log('Form submitted successfully')
        }
    });
    
    const handleFormSubmit = async (formApi, formState) => {
        console.log(formApi, formState);

        try {
            const { values } = formState;
            // formApi.submitForm();
            console.log(values,"values rr");
            
            if (
                !values.email ||
                !values.firstName ||
                !values.lastName ||
                !values.phoneNumber ||
                !values.file
            ) {
                return;
            }

            const response = await submitContactForm({
                variables: {
                    request_type: String("General Inquiry"),
                    email: String(values.email),
                    name: String(values.firstName),
                    telephone: String(values.phoneNumber),
                    orderNumber: String(values.orderNumber || ""),
                    comment: String(values.message || ""),
                    productSku: String(values.productSku || ""),
                },
            });
            if (response.data.submitContactForm) {
                console.log("form has been submitted successfully");
                
                toast.success("Your form has been submitted successfully!");
                formApi.reset({});
            }
        } catch (err) {
            console.log("try again");
            
            console.log(err.message);
            // showError("Please try again.");
        }
    };
    
    return {
        handleFormSubmit,
        data,
        mutationLoading
    }
}
