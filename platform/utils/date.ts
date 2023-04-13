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

import {Timestamp} from '@/libs/firebase';
import moment from 'moment';

const processDate = (date: Date | typeof Timestamp | string, format = 'LLL') => {
  if (date instanceof Date) {
    return moment(date.toDateString()).format(format)
  } else if (date instanceof Timestamp) {
    return moment(date.toDate()).format(format);
  }
  return moment(date as string).format(format);
}

const processEpoch = (epoch: number, format = 'LLL') => {
  return moment.unix(epoch).format(format);
}

const isGreaterThanToday = (dateStr: string, format = 'MM/DD/YYYY') => {
  const result = moment().diff(moment(dateStr, format));
  return result < 0;
}

const processDateFromNow = (date: Date | typeof Timestamp | string) => {
  if (date instanceof Date) {
    return moment(date.toDateString()).fromNow();
  } else if (date instanceof Timestamp) {
    return moment(date.toDate()).fromNow();
  }
  return moment(date as string).fromNow();
}

const processDateDiffFromNow = (date: Date | typeof Timestamp | string) => {
  let momentDate;
  if (date instanceof Date) {
    momentDate = moment(date.toDateString());
  } else if (date instanceof Timestamp) {
    momentDate = moment(date.toDate());
  } else {
    momentDate = moment(date as string)
  }
  const days = moment().diff(momentDate, "days");
  const hours = moment().diff(momentDate, "hours") % 24;
  const minutes = moment().diff(momentDate, "minutes") % 60;
  const seconds = moment().diff(momentDate, "seconds") % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

const processEpochDateDiffFromNow = (epoch: number) => {
  const momentDate = moment.unix(epoch);

  const days = moment().diff(momentDate, "days");
  const hours = moment().diff(momentDate, "hours") % 24;
  const minutes = moment().diff(momentDate, "minutes") % 60;
  const seconds = moment().diff(momentDate, "seconds") % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

const processEpochDiffFromNow = (epoch: number) => {
  const momentDate = moment.unix(epoch);
  return momentDate.fromNow();
}

const processDateDiff = (startDate: Date | typeof Timestamp | string, endDate: Date | typeof Timestamp | string) => {
  let momentStartDate;
  let momentEndDate;
  if (startDate instanceof Date) {
    momentStartDate = moment(startDate.toDateString());
  } else if (startDate instanceof Timestamp) {
    momentStartDate = moment(startDate.toDate());
  } else {
    momentStartDate = moment(startDate as string)
  }

  if (endDate instanceof Date) {
    momentEndDate = moment(endDate.toDateString());
  } else if (endDate instanceof Timestamp) {
    momentEndDate = moment(endDate.toDate());
  } else {
    momentEndDate = moment(endDate as string)
  }
  const days = momentEndDate.diff(momentStartDate, "days");
  const hours = momentEndDate.diff(momentStartDate, "hours") % 24;
  const minutes = momentEndDate.diff(momentStartDate, "minutes") % 60;
  const seconds = momentEndDate.diff(momentStartDate, "seconds") % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function processSeconds(seconds: number) {
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds = Math.round(seconds % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}


export {
  processDate,
  processDateFromNow,
  processEpoch,
  processEpochDiffFromNow,
  processDateDiffFromNow,
  processEpochDateDiffFromNow,
  processDateDiff,
  isGreaterThanToday,
  processSeconds,
};
