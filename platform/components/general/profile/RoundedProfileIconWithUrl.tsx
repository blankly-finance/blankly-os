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

import {getUserOnce} from '@/services/user-store';
import {User} from '@/types/user';
import Image from 'next/image';

async function getUserProfile(id: string) {
  const user = await getUserOnce(id);
  const data = user.data() as User;
  if (data) {
    return data.profileUrl;
  }
  return undefined;
}

const RoundedProfileIconWithUrl = (props: { profileUrl?: string, team: boolean }) => {
  let image;

  if (props.team) {
    image = (<Image layout="fill" objectFit="cover" src="/team.png" alt="Profile Photo"/>);
  } else {
    image = (<Image layout="fill" objectFit="cover" src="/default-profile.png" alt="Profile Photo"/>);
  }

  if (props.profileUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    image = (<img className="object-cover h-full" alt="Profile Photo" src={props.profileUrl}/>)
  }
  return (
    <div className="w-full h-full relative border border-gray-100 relative rounded-full overflow-hidden">
      {image}
    </div>
  );
}

RoundedProfileIconWithUrl.defaultProps = {
  team: false,
}

export default RoundedProfileIconWithUrl;
