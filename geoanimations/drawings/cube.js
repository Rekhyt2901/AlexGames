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

    myMatrix = multiplyMatrixWithMatrix(newScaleMatrix(0.5, 0.5, 0.5), myMatrix);

    //myMatrix = multiplyMatrixWithMatrix(newXRotationMatrix(Math.PI / 180 * frameCount * 1.5), myMatrix);
    myMatrix = multiplyMatrixWithMatrix(newYRotationMatrix(Math.PI / 180 * frameCount * 1.5), myMatrix);

    myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(2, 0, 0), myMatrix);
    myMatrix = multiplyMatrixWithMatrix(newZRotationMatrix(Math.PI / 180 * frameCount / 1.5), myMatrix);

    myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(0, 0, 3.5), myMatrix);

    myMatrix = multiplyMatrixWithMatrix([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ], myMatrix);

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
        [-1, -1, 1, 1],
        [1, -1, 1, 1],
        [1, 1, 1, 1],
        [-1, 1, 1, 1],
        [-1, -1, -1, 1],
        [1, -1, -1, 1],
        [1, 1, -1, 1],
        [-1, 1, -1, 1],
    ];
    let appliedPerspectivePoints = multiplyMatrixWithPointArray(myMatrix, points);
    appliedPerspectivePoints = getPerspectiveCoordinatesOfArray(appliedPerspectivePoints);
    let offsetPoints = addOffsetToPointArray(appliedPerspectivePoints, canvasWidth / 2, canvasHeight / 2);

    drawAllLines(offsetPoints);
    function drawAllLines(points) {
        function drawLineBetweenPoints(point1, point2) {
            context.beginPath();
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.moveTo(point1[0], point1[1]);
            context.lineTo(point2[0], point2[1]);
            context.stroke();
        }
        drawLineBetweenPoints(points[0], points[1]);
        drawLineBetweenPoints(points[1], points[2]);
        drawLineBetweenPoints(points[2], points[3]);
        drawLineBetweenPoints(points[3], points[0]);
        drawLineBetweenPoints(points[4], points[5]);
        drawLineBetweenPoints(points[5], points[6]);
        drawLineBetweenPoints(points[6], points[7]);
        drawLineBetweenPoints(points[7], points[4]);
        drawLineBetweenPoints(points[0], points[4]);
        drawLineBetweenPoints(points[1], points[5]);
        drawLineBetweenPoints(points[2], points[6]);
        drawLineBetweenPoints(points[3], points[7]);

        function fillPath(points, color) {
            context.beginPath();
            context.moveTo(points[0][0], points[0][1]);
            for (let i = 1; i < points.length; i++) {
                context.lineTo(points[i][0], points[i][1]);
            }
            context.fillStyle = color;
            context.fill();
        }

        let range = 16 * 16 / 4;
        let redNumber = (frameCount + 0) % (range * 2);
        let greenNumber = (frameCount + 32) % (range * 2);
        let blueNumber = (frameCount + 0) % (range * 2);
        if (redNumber > range) redNumber = range - (redNumber - range);
        if (greenNumber > range) greenNumber = range - (greenNumber - range);
        if (blueNumber > range) blueNumber = range - (blueNumber - range);

        // blueNumber = range - blueNumber;
        redNumber = range - redNumber;
        // greenNumber = range - greenNumber;

        redNumber += range * 3;
        greenNumber += range * 3;
        blueNumber += range * 3;

        redNumber--; greenNumber--; blueNumber--;
        redNumber = redNumber.toString(16);
        greenNumber = greenNumber.toString(16);
        blueNumber = blueNumber.toString(16);


        fillPath([points[2], points[3], points[7], points[6]], "#" + greenNumber + blueNumber + redNumber);
        fillPath([points[4], points[5], points[6], points[7]], "#" + greenNumber + blueNumber + redNumber);
        fillPath([points[0], points[3], points[7], points[4]], "#" + redNumber + greenNumber + blueNumber);
        fillPath([points[1], points[2], points[6], points[5]], "#" + redNumber + greenNumber + blueNumber);
        fillPath([points[0], points[1], points[5], points[4]], "#" + blueNumber + redNumber + greenNumber);
        fillPath([points[0], points[1], points[2], points[3]], "#" + blueNumber + redNumber + greenNumber);

    }
}