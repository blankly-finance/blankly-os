import { Request, Response, NextFunction } from "express";
import admin from 'firebase-admin';
import createError from 'http-errors';

/**
 * Attaches a CSRF token to the request.
 * @param {string} url The URL to check.
 * @param {string} cookie The CSRF token name.
 * @param {string} value The CSRF token value to save.
 * @return {express.Handler} The middleware function to run.
 */
const attachCSRF = (url: string) => {
    const token = (Math.random() * 100000000000000000).toString();
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.url == url) {
        res.cookie('csrf', token);
      }
      next();
    }
}

const verifySessionCookie = async (req: Request, res: Response, next: NextFunction) => {
    const sessionCookie = req.cookies.session || '';
    try {
        await admin.auth().verifySessionCookie(sessionCookie, true);
        next();
    }
    catch { 
        next(createError(401));
    }
}

export {
    attachCSRF,
    verifySessionCookie,
};