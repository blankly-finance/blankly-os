import * as functions from "firebase-functions";
import { getDoc } from "./firebase";

export const sendFeedbackEmails = functions.firestore.document('/feedback/{feedbackID}').onCreate(async (change, context) => {
    const userEmail = change.data().email;
    const feedback = change.data().feedback;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");

    const msg = {
        to: userEmail,
        from: 'hello@blankly.finance',
        templateId: 'd-f135cc9a94c9407e833be4efe8877eb8'
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Invite Email Sent')
        })
        .catch((error: any) => {
            console.error(error)
        });

    const blanklyMsg = {
        to: "blankly@blankly.finance",
        from: "hello@blankly.finance",
        templateId: "d-f157c09117b2401bb5821755fefee8da",
        dynamicTemplateData: {
            email: userEmail,
            feedback: feedback
        }
    }

    sgMail
        .send(blanklyMsg)
        .then(() => {
            console.log('Invite Email Sent')
        })
        .catch((error: any) => {
            console.error(error)
        });
})

export const addUserToContacts = functions.firestore.document('users/{uid}').onCreate(async (change, context) => {
    const email = change.data().email;
    const firstName = change.data().firstName;
    const lastName = change.data().lastName;
    const client = require('@sendgrid/client');
    client.setApiKey("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");
    console.log(email);

    const data = {
        "list_ids": ["0bff96bb-e149-4bd0-8342-f9ee7ba317f6"],
        "contacts": [
            {
                "email": email,
                "first_name": firstName,
                "last_name": lastName
            }
        ]
    };

    const request = {
        url: `/v3/marketing/contacts`,
        method: 'PUT',
        body: data
    }

    client.request(request)
        .then((response: any) => {
            console.log(response);
        })
        .catch((error: any) => {
            console.error(error.response.body.errors);
        });
})

export const alertBilling = functions.firestore.document('users/{uid}').onUpdate(async (change, context) => {
    const stripeCredits = change.after.data().stripeCredits;
    const name = `${change.after.data().firstName} ${change.after.data().lastName}`;
    const email = change.after.data().email
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");
    if (stripeCredits < 100) {
        const msg = {
            to: email,
            from: 'brandon.fan@blankly.finance',
            templateId: 'd-e8346f2c6925412db71136a9b85a91a6',
            dynamicTemplateData: {
                name: name,
                numCredits: stripeCredits,
                billingURL: `http://localhost:3000/personal-settings/billing`
            }
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error: any) => {
                console.error(error)
            })
    } else if (stripeCredits === 0) {
        const msg = {
            to: email,
            from: 'brandon.fan@blankly.finance',
            templateId: 'd-e8346f2c6925412db71136a9b85a91a6',
            dynamicTemplateData: {
                name: name,
                billingURL: `http://localhost:3000/personal-settings/billing`
            }
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error: any) => {
                console.error(error)
            })
    }

    return;
});


export const sendModelIsRunningEmail = functions.firestore.document('projects/{projectId}/models/{modelId}').onUpdate(async (change, context) => {
    const newModelData = change.after.data();
    const oldModelData = change.before.data();
    const client = require('@sendgrid/client');
    client.setApiKey("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");

    if (oldModelData.lifecycleStatus && newModelData.lifecycleStatus) {
        if (oldModelData.lifecycleStatus.running === false && newModelData.lifecycleStatus.running) {
            const query = await getDoc(`/users/${context.params.projectId}`);
            if (query.data()) {
                const email = query.data().email
                const msg = {
                    to: email,
                    from: 'brandon@blankly.finance',
                    templateId: 'd-3381b14eb7cf428682ee094068786ab1',
                    dynamicTemplateData: {
                        name: `${query.data().firstName} ${query.data().lastName}`,
                        modelName: `${newModelData.name}`,
                        url: `http://app.blankly.finance/${context.params.projectId}/${context.params.modelId}/overview`
                    }
                }
    
                client
                    .send(msg)
                    .then(() => {
                        console.log('Email sent')
                    })
                    .catch((error: any) => {
                        console.error(error)
                    })
            }
        }
    }
});
