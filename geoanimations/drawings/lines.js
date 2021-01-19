export default ({matrixjs, context, frameCount, canvasWidth, canvasHeight }) => {
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

    myMatrix = multiplyMatrixWithMatrix(newXRotationMatrix(Math.PI / 180 * frameCount * 1.5), myMatrix);
    myMatrix = multiplyMatrixWithMatrix(newYRotationMatrix(Math.PI / 180 * frameCount * 1.5), myMatrix);
    myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(0, 10, 0), myMatrix);
    myMatrix = multiplyMatrixWithMatrix(newZRotationMatrix(Math.PI / 180 * frameCount * 2), myMatrix);

    myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(0, 0, 50), myMatrix);

    let speed = 5;
    let rot = Math.PI / (180 / speed) * (frameCount % (720 / speed));
    if (rot > Math.PI * 1.5) {
        rot *= -1;
        myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(0, -16, 0), myMatrix);
    }
    if (rot < -Math.PI * 3.5) {
        rot *= -1;
        myMatrix = multiplyMatrixWithMatrix(newTranslationMatrix(0, 16, 0), myMatrix);
    }

    myMatrix = multiplyMatrixWithMatrix([
        1, 0, 0, 8 * Math.cos(rot),
        0, 1, 0, 8 * Math.sin(rot),
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

    let points = [];
    let amountOfLines = 10;
    for (let i = 0; i < amountOfLines; i++) {
        for (let j = 0; j < amountOfLines; j++) {
            let offi = (amountOfLines - 1) / 2;
            points.push([-i / 2, j - offi, 0, 1]);
            points.push([i / 2, j - offi, 0, 1]);

            points.push([i - offi, -j / 2, 0, 1]);
            points.push([i - offi, j / 2, 0, 1]);
        }
    }


    let appliedPerspectivePoints = multiplyMatrixWithPointArray(myMatrix, points);
    appliedPerspectivePoints = getPerspectiveCoordinatesOfArray(appliedPerspectivePoints);
    let offSetPoints = addOffsetToPointArray(appliedPerspectivePoints, canvasWidth/2, canvasHeight/2);

    drawAllLines(offSetPoints);
    function drawAllLines(points) {
        for (let i = 0; i < points.length; i += 2) {
            context.beginPath();
            context.moveTo(points[i][0], points[i][1]);
            context.lineTo(points[i + 1][0], points[i + 1][1]);
            context.lineWidth = 2;
            let range = 16*16/4;
            let colorNumber = frameCount % (range*2);
            if (colorNumber > range) colorNumber = range - (colorNumber - range);
            colorNumber += range * 3;
            context.strokeStyle = "#0" + colorNumber.toString(16);
            context.stroke();
        }
    }
}