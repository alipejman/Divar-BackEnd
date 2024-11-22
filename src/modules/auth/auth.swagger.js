/**
 * @swagger
 * tags:
 *  name: auth
 *  description: Auth Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     sendOTP:
 *       type: object
 *       required:
 *         - mobile
 *       properties:
 *         mobile:
 *           type: string
 *     checkOTP:
 *       type: object
 *       required:
 *         - mobile
 *         - code
 *       properties:
 *         mobile:
 *           type: string
 *         code:
 *           type: string
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: login with otp in this endpoint
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/sendOTP'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sendOTP'
 *     responses: 
 *       200:
 *         description: success
 */

/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: check otp for login user
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/checkOTP'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/checkOTP'
 *     responses: 
 *       200:
 *         description: success
 */
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: logout user
 *     tags:
 *       - auth
 *     responses: 
 *       200:
 *         description: success
 */
