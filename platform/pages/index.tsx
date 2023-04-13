/*******************************************************************/
/*                                                                 */
/*                  BLANKLY FINANCE CONFIDENTIAL                   */
/*                   _ _ _ _ _ _ _ _ _ _ _ _ _                     */
/*                                                                 */
/* Copyright 2022 Blankly Finance Incorporated                     */
/* All Rights Reserved.                                            */
/*                                                                 */
/* NOTICE:  All information contained herein is, and remains the   */
/* property of Blankly Finance Incorporated and its suppliers, if  */
/* any.  The intellectual and technical concepts contained         */
/* herein are proprietary to Blankly Finance Incorporated and its  */
/* suppliers and may be covered by U.S. and Foreign Patents,       */
/* patents in process, and are protected by trade secret or        */
/* copyright law.  Dissemination of this information or            */
/* reproduction of this material is strictly forbidden unless      */
/* prior written permission is obtained from Blankly Finance       */
/* Incorporated.                                                   */
/*                                                                 */
/*******************************************************************/

import {useAuth} from '@/libs/auth';
import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router';
import {useEffect} from 'react';

// TODO move this elsewhere
export const LoadingSpinner = ({text}: { text: string }) => {
    return <div className={styles.container}>
        <div className="flex flex-col justify-center items-center py-32">
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
            <p className="inconsolata">{text}</p>
        </div>
    </div>;
}

const Home: NextPage = () => {
    const {user, loading} = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/signin');
            } else {
                router.push(`/${user.uid}`); // route to user ID project
            }
        }
    })
    return <LoadingSpinner text={"Loading Blankly Magic..."}/>;
}


export default Home;
