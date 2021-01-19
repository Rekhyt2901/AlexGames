export default ({ matrixjs, context, frameCount, canvasWidth, canvasHeight }) => {
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



    let perspectiveOptions = {
        imageResolutionX: canvasWidth,
        imageResolutionY: canvasHeight,
        sensorSizeX: canvasWidth / 10000, //0.108
        sensorSizeY: canvasHeight / 10000, //0.072
        focalLength: 0.1,
        skew: 0
    };
    let perspectiveMatrix = newPerspectiveMatrix(perspectiveOptions);
    let myMatrix = newIdentityMatrix(4);

    let points = [[0, 0, 0, 1], [1,1,1,1]];


    let divider = 25;
    let speed = 0.25;
    for (let i = 0; i < 360 / divider; i++) {
        for (let j = 0; j < 360 / divider; j++) {
            let myMatrix2 = multiplyMatrixWithMatrix(newTranslationMatrix(0.1, 0, 0), myMatrix); //Weg von Mitte
            myMatrix2 = multiplyMatrixWithMatrix(newZRotationMatrix(Math.PI / 180 * i * divider), myMatrix2); //Kreis

            myMatrix2 = multiplyMatrixWithMatrix(newYRotationMatrix(Math.PI / 180 * 90), myMatrix2); // 90° Kreis Drehen

            myMatrix2 = multiplyMatrixWithMatrix(newTranslationMatrix(0, 0, 0.3), myMatrix2); //Weg von Mitte
            myMatrix2 = multiplyMatrixWithMatrix(newYRotationMatrix(Math.PI / 180 * j * divider), myMatrix2); //Kreis rotieren lassen


            myMatrix2 = multiplyMatrixWithMatrix(newZRotationMatrix(Math.PI / 180 * frameCount * speed), myMatrix2); //Bisschen von oben gucken
            myMatrix2 = multiplyMatrixWithMatrix(newXRotationMatrix(Math.PI / 180 * frameCount * speed), myMatrix2); //Bisschen von oben gucken





            myMatrix2 = multiplyMatrixWithMatrix(newTranslationMatrix(0, 0, 1), myMatrix2); //Weiter weg gehen von Donut
            myMatrix2 = multiplyMatrixWithMatrix(perspectiveMatrix, myMatrix2);

            let appliedPerspectivePoints = multiplyMatrixWithPointArray(myMatrix2, points);
            appliedPerspectivePoints = getPerspectiveCoordinatesOfArray(appliedPerspectivePoints);
            let offsetPoints = addOffsetToPointArray(appliedPerspectivePoints, canvasWidth / 2, canvasHeight / 2);

            let point = offsetPoints[0];
            let point2 = offsetPoints[1];
            context.fillStyle = "rgb(" + 0 + "," + 255 + "," + 255 + ")";
            context.fillRect(point[0], point[1], 3/point[2], 3/point[2]);
            context.fillStyle = "rgb(" + 0 + "," + 150 + "," + 150 + ")";
            // context.fillRect(point2[0], point2[1], 1/point2[2], 1/point2[2]);
        }
    }
}