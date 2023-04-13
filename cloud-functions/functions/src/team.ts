import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import { getDoc } from "./firebase";

export const sendTeamInviteEmail = functions.firestore.document(`/teams/{teamId}/invites/{memberId}`).onCreate(async (change, context) => {
    const email = change.data().email;
    const inviterName = change.data().inviterName;
    const teamData = await getDoc(`/teams/${context.params.teamId}`);


    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");
    const msg = {
        to: email,
        from: 'hello@blankly.finance',
        templateId: 'd-4362507854a748568ed2ac273f9815ee',
        dynamicTemplateData: {
            subject: `Blankly Platform - ${inviterName} Invited You to Join ${teamData.name}`,
            joinName: teamData.name,
            inviterName: inviterName,
            joinUrl: `https://app.blankly.finance/join?team=${context.params.teamId}`,
        }
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Invite Email Sent')
        })
        .catch((error: any) => {
            console.log(error)
        })
    return;
});

export const sendViewOnlyCollaborator = functions.firestore.document(`/projects/{projectId}/invites/{id}`).onCreate(async (change, context) => {
    const email = change.data().email;
    const inviterName = change.data().inviterName;

    const projectRef = admin.firestore().doc(`/projects/${context.params.projectId}`);
    const res = await projectRef.get();
    const projectData = res.data() as any;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");
    const msg = {
        to: email,
        from: 'hello@blankly.finance',
        templateId: 'd-4362507854a748568ed2ac273f9815ee',
        dynamicTemplateData: {
            subject: `Blankly Platform - ${inviterName} Invited You to Join ${projectData.name} as a View Only Collaborator`,
            joinName: projectData.name,
            inviterName: inviterName,
            joinUrl: `https://app.blankly.finance/join?project=${context.params.projectId}`,
        }
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('View Only Collaborator Email Sent')
        })
        .catch((error: any) => {
            console.error(error.response.body.errors)
        })
    return;
})
