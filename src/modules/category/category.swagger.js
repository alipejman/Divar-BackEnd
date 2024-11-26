/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *       properties:
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         icon:
 *           type: string
 *         parent:
 *           type: string
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCategory'
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateCategory'
 */

