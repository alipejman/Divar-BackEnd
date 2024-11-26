/**
 * @swagger
 * tags:
 *   name: Option
 *   description: Option Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOption:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - category
 *         - enum
 *       properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         category:
 *           type: string
 *         guid:
 *           type: string
 *         required:
 *           type: boolean
 *         type:
 *           type: string
 *           enum:
 *             - number
 *             - string
 *             - boolean
 *             - array
 *         enum:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /option:
 *   post:
 *     summary: Create a new option for category
 *     tags:
 *       - Option
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateOption'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOption'
 *     responses:
 *       201:
 *         description: Created option
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateOption'
 */

/**
 * @swagger
 * /option/by-category/{categoryId}:
 *   get:
 *     summary: Get all options of a category
 *     tags:
 *       - Option
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: The ID of the category to get options for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of options for the category
 */
/**
 * @swagger
 * /option/by-category-slug/{slug}:
 *   get:
 *     summary: Get all options of a category
 *     tags:
 *       - Option
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         description: The slug of the category to get options for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of options for the category
 */
/**
 * @swagger
 * /option/{Id}:
 *   get:
 *     summary: Get options by Id
 *     tags:
 *       - Option
 *     parameters:
 *       - name: Id
 *         in: path
 *         required: true
 *         description: The ID of the category to get options for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of options for the category
 */
/**
/**
 * @swagger
 * /option/{Id}:
 *   delete:
 *     summary: Get options by Id
 *     tags:
 *       - Option
 *     parameters:
 *       - name: Id
 *         in: path
 *         required: true
 *         description: The ID of the option to delete options for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A message of options for the deleted action
 */
/**
 * @swagger
 * /option/:
 *   get:
 *     summary: Get all options 
 *     tags:
 *       - Option
 *     responses:
 *       200:
 *         description: A list of options for the category
 */
