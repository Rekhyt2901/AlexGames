export default ({ matrixjs, context, frameCount, canvasWidth, canvasHeight }, obj) => {
    let {
        newIdentityMatrix,
        newTranslationMatrix,
        newScaleMatrix,
        newXRotationMatrix,
        newYRotationMatrix,
        newZRotationMatrix,
        newPerspectiveMatrix,
        getPerspectiveCoordinates,
        getPerspectiveCoordinatesOfArray,
        multiplyMatrixWithMatrix,
        multiplyMatrixWithPoint,
        multiplyMatrixWithPointArray,
        getDotProduct,
        getMinor,
        getDeterminant,
        getTranspose,
        getInverse,
        addOffsetToPoint,
        addOffsetToPointArray
    } = matrixjs;


    let myMatrix = newIdentityMatrix(4);

    //------------Start-of-Matrix-Manipulations----------------//

    // myMatrix = multiplyMatrixWithMatrix(newScaleMatrix(0.5, 0.5, 0.5), myMatrix);
    // myMatrix = multiplyMatrixWithMatrix(newXRotationMatrix(Math.PI / 180 * frameCount), myMatrix);
    myMatrix = multiplyMatrixWithMatrix(newYRotationMatrix(Math.PI / 180 * frameCount), myMatrix);

    // let inverseMatrix = getInverse(myMatrix);
    // inverseMatrix = getTranspose(inverseMatrix);

    // myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(2, 0, 0), myMatrix);
    // myMatrix = multiplyMatrixWithMatrix(newZRotationMatrix(Math.PI / 180 * 45), myMatrix);
    myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(0, -0.4, 5), myMatrix);

    //------------End-of-Matrix-Manipulations----------------//


    let perspectiveOptions = {
        imageResolutionX: canvasWidth,
        imageResolutionY: canvasHeight,
        sensorSizeX: canvasWidth / 10000, //0.108
        sensorSizeY: canvasHeight / 10000, //0.072
        focalLength: 0.1,
        skew: 0
    };
    let perspectiveMatrix = newPerspectiveMatrix(perspectiveOptions);
    myMatrix = multiplyMatrixWithMatrix(perspectiveMatrix, myMatrix);



    let myPoints = obj.vertices;
    let appliedPoints = multiplyMatrixWithPointArray(myMatrix, myPoints);
    appliedPoints = getPerspectiveCoordinatesOfArray(appliedPoints);
    let offsetPoints = addOffsetToPointArray(appliedPoints, canvasWidth / 2, canvasHeight / 2);

    // let myNormals = obj.vertexNormals;
    // let appliedNormals = multiplyMatrixWithPointArray(inverseMatrix, myNormals);
    // appliedNormals = getPerspectiveCoordinatesOfArray(appliedNormals); // Brauche ich das?

    // drawAllLines(offsetPoints, appliedNormals, obj.faces);
    drawAllLines(offsetPoints, undefined, obj.faces);
    function drawAllLines(points, normals, faces) {
        for (let i = 0; i < faces.length; i++) {
            let face = faces[i];
            let facePoint = face[0];
            context.beginPath();

            context.moveTo(points[facePoint.vertexIndex][0], points[facePoint.vertexIndex][1]);
            
            for (let j = 1; j < face.length; j++) {
                facePoint = face[j];
                
                context.lineTo(points[facePoint.vertexIndex][0], points[facePoint.vertexIndex][1]);
            }

            facePoint = face[0];
            context.lineTo(points[facePoint.vertexIndex][0], points[facePoint.vertexIndex][1]);

            // let lightSource = [-1, -1, -1, 1];
            // let normalVector = normals[facePoint.normalIndex];
            // let normalMagnitude = Math.sqrt(normalVector[0]**2 + normalVector[1]**2 + normalVector[2]**2);
            // normalVector = [normalVector[0] / normalMagnitude, normalVector[1] / normalMagnitude, normalVector[2] / normalMagnitude, 1];

            // let lightIntensity = getDotProduct(lightSource, normalVector);
            // let lightness = 50 / 4.61 * lightIntensity + 25;
            // let color = `hsl(120, 100%, ${lightness}%)`;

            let color = `hsl(120, 100%, 100%)`;
            context.strokeStyle = color;
            context.lineWidth = 0.1
            context.stroke();
            context.fillStyle = color;
            // context.fill();
        }
    }
}