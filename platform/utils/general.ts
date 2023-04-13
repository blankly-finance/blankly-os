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

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function splitAndCapitalize(str: string, splitStr: string) {
  if (str) {
    return str.split(splitStr).map((val) => {
      return val.charAt(0).toUpperCase() + val.slice(1);
    }).join(' ');
  }
  return '-';
}

export function isEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function isPhone(phone: string) {
  if (phone == undefined) {
    return false
  }

  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  return re.test(String(phone).toLowerCase()) || (phone.length == 10 && /^-?\d+$/.test(phone))
}

export function round(num: number, end: number) {
  if (num) {
    return num.toFixed(end)
  }
  return num;
}

export function getPrimaryColor(index: number) {
  if (index > 7) {
    return "#FF0000";
  }
  const colors: any = ["rgba(55, 114, 255, 1)", "rgba(240, 56, 255, 1)", "rgba(239, 112, 157, 1)", "rgba(226, 239, 112, 1)",
    "rgba(112, 228, 239, 1)", "rgba(147, 129, 255, 1)", "rgba(255, 216, 190, 1)", "rgba(213, 106, 160, 1)"];
  return colors[index];
}

export function getTopColor(index: number) {
  if (index > 7) {
    return "#FF0000";
  }
  const colors: any = ["rgba(55, 114, 255, .7)", "rgba(240, 56, 255, .7)", "rgba(239, 112, 157, .7)", "rgba(226, 239, 112, .7)",
    "rgba(112, 228, 239, .7)", "rgba(147, 129, 255, .7)", "rgba(255, 216, 190, .7)", "rgba(213, 106, 160, .7)"];
  return colors[index];
}

export function getBottomColor(index: number) {
  if (index > 7) {
    return "#FF0000";
  }
  const colors: any = ["rgba(55, 114, 255, .3)", "rgba(240, 56, 255, .3)", "rgba(239, 112, 157, .3)", "rgba(226, 239, 112, .3)",
    "rgba(112, 228, 239, .3)", "rgba(147, 129, 255, .3)", "rgba(255, 216, 190, .3)", "rgba(213, 106, 160, .3)"];
  return colors[index];
}

export function prettyPrintJSON(json: Object) {
  return JSON.stringify(json, undefined, 2);
}

export function encodeGetParams(p: Object) {
  return Object.entries(p).filter(kv => kv[1]).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
}
