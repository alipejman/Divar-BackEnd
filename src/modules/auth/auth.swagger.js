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
 *     responses: 
 *       200:
 *         description: success
 */
