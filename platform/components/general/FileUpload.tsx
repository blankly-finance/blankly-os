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

import React from "react";

export interface IProps {
    acceptedFileTypes?: string;
    allowMultipleFiles?: boolean;
    label: string;
    onChange: (fileList: FileList) => void;
    uploadFileName: string;
}

export const FileUpload: React.FC<IProps> = (props) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const formRef = React.useRef<HTMLFormElement | null>(null);

    const onClickHandler = () => {
        fileInputRef.current?.click();
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }

        props.onChange(event.target.files);

        formRef.current?.reset();
    };

    return (
        <form ref={formRef}>
            <button type="button" className="mt-3 leading-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onClickHandler}>
                {props.label}
            </button>
            <input
                accept={props.acceptedFileTypes}
                multiple={props.allowMultipleFiles}
                name={props.uploadFileName}
                onChange={onChangeHandler}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
            />
        </form>
    );
};

FileUpload.defaultProps = {
    acceptedFileTypes: '',
    allowMultipleFiles: false,
};

export default FileUpload;
