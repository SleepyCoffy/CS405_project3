/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        var transformedMvp = mvp; // mvp = model view projection matrix perspective, it is far new calculation. Look in perspective matrix in slides
        var transformedModelView = modelView; // I want to draw my objects and consider my camera location.
        var transformedNormals = normalMatrix; // transform matrix of normals calculated with inverse transpose of model view matrix
        var transformedModel = modelMatrix; // matrix representation of transformation applied to my object

        transformedMvp = MatrixMult(mvp, this.trs.getTransformationMatrix());
        transformedModelView = MatrixMult(modelView, this.trs.getTransformationMatrix());
        transformedNormals = MatrixMult(normalMatrix, this.trs.getTransformationMatrix());
        transformedModel = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());
        
        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Draw children recursively
        for (const child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
}