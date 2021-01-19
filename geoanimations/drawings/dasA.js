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


    let myMatrix = newIdentityMatrix(4);

    //------------Start-of-Matrix-Manipulations----------------//

    // myMatrix = multiplyMatrixWithMatrix(newXRotationMatrix(Math.PI / 180 * frameCount * 1.5), myMatrix);
    let speed = 0.35;
    let rotateBy = 30 / speed;
    let rot = frameCount % (rotateBy*2);
    if(rot > rotateBy) rot = rotateBy*2 - rot;
    
    let rot2 = frameCount % (rotateBy*2*2);
    if(rot2 > frameCount % (rotateBy*2)) speed *= -1;
    rot *= speed;
    // myMatrix = multiplyMatrixWithMatrix(newZRotationMatrix(Math.PI / 180 * -90), myMatrix);
    myMatrix = multiplyMatrixWithMatrix(newYRotationMatrix(Math.PI / 180 * rot), myMatrix);
    // myMatrix = multiplyMatrixWithMatrix(newZRotationMatrix(Math.PI / 180 * frameCount), myMatrix);
    // myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(0, -1, 0), myMatrix);
    // myMatrix = multiplyMatrixWithMatrix(newZRotationMatrix(Math.PI / 180 * frameCount * 2), myMatrix);

    myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(0, 0, 2), myMatrix);

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

    let points = [
        [0, 1, 0.1, 1],
        [-0.7, -0.5, 0.2, 1],
        [-0.5, -0.5, 0.2, 1],
        [-0.25, 0, 0.2, 1],
        [0.25, 0, 0.2, 1],
        [0.5, -0.5, 0.2, 1],
        [0.7, -0.5, 0.2, 1],
        [-0.2, 0.2, 0.2, 1],
        [0, 0.6, 0.2, 1],
        [0.2, 0.2, 0.2, 1],

        [0, 1, 0, 1],
        [-0.7, -0.5, 0, 1],
        [-0.5, -0.5, 0, 1],
        [-0.25, 0, 0, 1],
        [0.25, 0, 0, 1],
        [0.5, -0.5, 0, 1],
        [0.7, -0.5, 0, 1],
        [-0.2, 0.2, 0, 1],
        [0, 0.6, 0, 1],
        [0.2, 0.2, 0, 1],

    ];

    let appliedPerspectivePoints = multiplyMatrixWithPointArray(myMatrix, points);
    appliedPerspectivePoints = getPerspectiveCoordinatesOfArray(appliedPerspectivePoints);
    let offSetPoints = addOffsetToPointArray(appliedPerspectivePoints, canvasWidth/2, canvasHeight/2);
    
    drawAllLines(offSetPoints);
    function drawAllLines(points) {
        function drawLineBetweenPoints(point1, point2) {
            context.beginPath();
            context.strokeStyle = "white";
            context.lineWidth = 2;
            context.moveTo(point1[0], point1[1]);
            context.lineTo(point2[0], point2[1]);
            context.stroke();
        }

        for (let i = 0; i <= 10; i += 10) {
            drawLineBetweenPoints(points[0+i], points[1+i]);
            drawLineBetweenPoints(points[1+i], points[2+i]);
            drawLineBetweenPoints(points[2+i], points[3+i]);
            drawLineBetweenPoints(points[3+i], points[4+i]);
            drawLineBetweenPoints(points[4+i], points[5+i]);
            drawLineBetweenPoints(points[5+i], points[6+i]);
            drawLineBetweenPoints(points[6+i], points[0+i]);
            drawLineBetweenPoints(points[7+i], points[8+i]);
            drawLineBetweenPoints(points[8+i], points[9+i]);
            drawLineBetweenPoints(points[9+i], points[7+i]);
        }

        for (let i = 0; i < points.length / 2; i++) {
            drawLineBetweenPoints(points[i], points[i + 10]);
        }
    }
}