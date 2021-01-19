function newIdentityMatrix(size) {
    let identitiyMatrix = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            identitiyMatrix.push(j === i ? 1 : 0);
        }
    }
    return identitiyMatrix;
}

function newTranslationMatrix(x, y, z) {
    return [
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
    ];
}

function newScaleMatrix(x, y, z) {
    return [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ];
}

function newXRotationMatrix(x) {
    return [
        1, 0, 0, 0,
        0, Math.cos(x), -Math.sin(x), 0,
        0, Math.sin(x), Math.cos(x), 0,
        0, 0, 0, 1
    ];
}

function newYRotationMatrix(y) {
    return [
        Math.cos(y), 0, Math.sin(y), 0,
        0, 1, 0, 0,
        -Math.sin(y), 0, Math.cos(y), 0,
        0, 0, 0, 1
    ];
}

function newZRotationMatrix(z) {
    return [
        Math.cos(z), -Math.sin(z), 0, 0,
        Math.sin(z), Math.cos(z), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}

function newPerspectiveMatrix({ imageResolutionX, imageResolutionY, sensorSizeX, sensorSizeY, focalLength, skew }) {
    let constantX = (focalLength * imageResolutionX) / (2 * sensorSizeX);
    let constantY = (focalLength * imageResolutionY) / (2 * sensorSizeY);
    return [
        constantX, skew, 0, 0,
        0, constantY, 0, 0,
        0, 0, -1, 0,
        0, 0, 0, 1
    ];
}

function getPerspectiveCoordinates(coordinates) { //With: Perspective, Without: Orthographic
    let x = coordinates[0];
    let y = coordinates[1];
    let z = coordinates[2];
    let w = coordinates[3];
    return [x / z, y / z, z, w];
}

function getPerspectiveCoordinatesOfArray(points) { //With: Perspective, Without: Orthographic
    return points.map((coordinates) => {
        let x = coordinates[0];
        let y = coordinates[1];
        let z = coordinates[2];
        let w = coordinates[3];
        return [x / z, y / z, z, w];
    });
}

function multiplyMatrixWithMatrix(matrix1, matrix2) {
    let resultMatrix = [];
    if (matrix1.length !== matrix2.length) throw "Can't multiply different sized Matrices!";
    if (Math.sqrt(matrix1.length) % 1 !== 0) throw "Can't multiply none square Matrices!";

    for (let i = 0; i < matrix1.length; i++) {
        let matrixSideLength = Math.sqrt(matrix1.length);
        let j = i % matrixSideLength;
        let k = Math.floor(i / matrixSideLength);
        let result = 0;
        for (let l = 0; l < matrixSideLength; l++) {
            result += matrix1[k * matrixSideLength + l] * matrix2[j + matrixSideLength * l];
        }
        resultMatrix[i] = result;
    }
    return resultMatrix;
}

function multiplyMatrixWithPoint(matrix, point) {
    let resultPoint = [];
    if (Math.sqrt(matrix.length) % 1 !== 0) throw "Can't multiply none square Matrices!";
    if (Math.sqrt(matrix.length) !== point.length) throw "Can't multipy different sized Points and Matrices";

    let matrixSideLength = point.length;
    for (let i = 0; i < matrixSideLength; i++) {
        let result = 0;
        for (let j = 0; j < matrixSideLength; j++) {
            result += matrix[i * matrixSideLength + j] * point[j];
        }
        resultPoint[i] = result;
    }
    return resultPoint;
}

function multiplyMatrixWithPointArray(matrix, points) {
    return points.map((point) => {
        let resultPoint = [];
        if (Math.sqrt(matrix.length) % 1 !== 0) throw "Can't multiply none square Matrices!";
        if (Math.sqrt(matrix.length) !== point.length) throw "Can't multipy different sized Points and Matrices";

        let matrixSideLength = point.length;
        for (let i = 0; i < matrixSideLength; i++) {
            let result = 0;
            for (let j = 0; j < matrixSideLength; j++) {
                result += matrix[i * matrixSideLength + j] * point[j];
            }
            resultPoint[i] = result;
        }
        return resultPoint;
    });
}

function getDotProduct(point1, point2) {
    if(point1.length !== point2.length) throw "Can't multiply unequal Dots!";
    let result = 0;
    for(let i = 0; i < point1.length; i++) {
        result += point1[i]*point2[i];
    }
    return result;
}

function getMinor(matrix, px, py) {
    let matrixSideLength = Math.sqrt(matrix.length);
    let elimRow = px;
    let elimCol = py;

    let newMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        let x = Math.floor(i / matrixSideLength);
        let y = i % matrixSideLength;

        if (x != elimRow && y != elimCol) newMatrix.push(matrix[i]);
    }
    return newMatrix;
}

function getDeterminant(matrix) {
    let matrixSideLength = Math.sqrt(matrix.length);

    let determinant = 0;

    for (let i = 0; i < matrixSideLength; i++) {
        let x = 0;
        let y = i;
        let minor = getMinor(matrix, x, y);
        determinant += matrix[x * 4 + y] * Math.pow(-1, x + y) * (minor.length == 1 ? minor : getDeterminant(minor));
    }
    return determinant;
}

function getTranspose(matrix) {
    let newMatrix = matrix;

    let matrixSideLength = Math.sqrt(matrix.length);

    for (let i = 0; i < matrix.length; i++) {
        let j = i % matrixSideLength;
        let k = Math.floor(i / matrixSideLength);
        newMatrix[4 * j + k] = matrix[4 * k + j];
    }
    return newMatrix;
}

function getInverse(matrix) {
    /* let matrixSideLength = Math.sqrt(matrix.length);
    let determinant = getDeterminant(matrix);
    if (determinant === 0) return newIdentityMatrix(matrixSideLength);

    let subMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        let x = i % matrixSideLength;
        let y = Math.floor(i / matrixSideLength);

        let minor = getMinor(matrix, y, x);
        subMatrix[i] = getDeterminant(minor); // swapped!

        //if(i % 2 === 1 && subMatrix[i] != 0) subMatrix[i] *= -1;
    }

    for (let i = 0; i < subMatrix.length; i++) {
        subMatrix[i] *= 1 / determinant;
    }

    return subMatrix; */

    let M = [];
    let matrixSideLength = Math.sqrt(matrix.length);
    for (let i = 0; i < matrix.length; i++) {
        let x = Math.floor(i / matrixSideLength);
        let y = i % matrixSideLength;
        if(y === 0) M[x] = [];
        M[x][y] = matrix[i];
    }

    /*--- NICHT MEIN CODE */

    // I use Guassian Elimination to calculate the inverse:
    // (1) 'augment' the matrix (left) by the identity (on the right)
    // (2) Turn the matrix on the left into the identity by elemetry row ops
    // (3) The matrix on the right is the inverse (was the identity matrix)
    // There are 3 elemtary row ops: (I combine b and c in my code)
    // (a) Swap 2 rows
    // (b) Multiply a row by a scalar
    // (c) Add 2 rows

    //if the matrix isn't square: exit (error)
    if (M.length !== M[0].length) { return; }

    //create the identity matrix (I), and a copy (C) of the original
    let i = 0, ii = 0, j = 0, dim = M.length, e = 0, t = 0;
    let I = [], C = [];
    for (i = 0; i < dim; i += 1) {
        // Create the row
        I[I.length] = [];
        C[C.length] = [];
        for (j = 0; j < dim; j += 1) {

            //if we're on the diagonal, put a 1 (for identity)
            if (i == j) { I[i][j] = 1; }
            else { I[i][j] = 0; }

            // Also, make the copy of the original
            C[i][j] = M[i][j];
        }
    }

    // Perform elementary row operations
    for (i = 0; i < dim; i += 1) {
        // get the element e on the diagonal
        e = C[i][i];

        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if (e == 0) {
            //look through every row below the i'th row
            for (ii = i + 1; ii < dim; ii += 1) {
                //if the ii'th row has a non-0 in the i'th col
                if (C[ii][i] != 0) {
                    //it would make the diagonal have a non-0 so swap it
                    for (j = 0; j < dim; j++) {
                        e = C[i][j];       //temp store i'th row
                        C[i][j] = C[ii][j];//replace i'th row by ii'th
                        C[ii][j] = e;      //repace ii'th by temp
                        e = I[i][j];       //temp store i'th row
                        I[i][j] = I[ii][j];//replace i'th row by ii'th
                        I[ii][j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = C[i][i];
            //if it's still 0, not invertable (error)
            if (e == 0) { return }
        }

        // Scale this row down by e (so we have a 1 on the diagonal)
        for (j = 0; j < dim; j++) {
            C[i][j] = C[i][j] / e; //apply to original matrix
            I[i][j] = I[i][j] / e; //apply to identity
        }

        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for (ii = 0; ii < dim; ii++) {
            // Only apply to other rows (we want a 1 on the diagonal)
            if (ii == i) { continue; }

            // We want to change this element to 0
            e = C[ii][i];

            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for (j = 0; j < dim; j++) {
                C[ii][j] -= e * C[i][j]; //apply to original matrix
                I[ii][j] -= e * I[i][j]; //apply to identity
            }
        }
    }

    //we've done all operations, C should be the identity
    //matrix I should be the inverse:
    //return I;

    /*--- ENDE NICHT MEIN CODE */

    let inverseMatrix = [];
    for(let iIndex = 0; iIndex < I.length; iIndex++) {
        for(let jIndex = 0; jIndex < I[iIndex].length; jIndex++) {
            inverseMatrix.push(I[iIndex][jIndex]);
        }
    }
    return inverseMatrix;
}

function addOffsetToPoint(xOffset, yOffset, unOffsetPoint) {
    let x = unOffsetPoint[0];
    let y = unOffsetPoint[1];
    x += xOffset;
    y += yOffset;
    return [x, y, unOffsetPoint[2], unOffsetPoint[3]];
}

function addOffsetToPointArray(unOffsetPoints, xOffset, yOffset) {
    return unOffsetPoints.map((point) => {
        let x = point[0];
        let y = point[1];
        x += xOffset;
        y += yOffset;
        return [x, y, point[2], point[3]];
    });
}


/* --- 1. Make Identity Matrix!      --- */
/* --- 2. Apply Rotations!           --- */
/* --- 3. Apply Scalation!           --- */
/* --- 4. Apply Translation!         --- */
/* --- 5. Apply Perspective Matrix!  --- */
/* --- 6. Apply Matrix to Point!     --- */
/* --- 7. Divide x and y by z!       --- */
/* --- 8. Add Offset for centration! --- */
/* --- 9. Draw!                      --- */



// Activate if using with import statement
// Deativate if using with html <script> tag

export default {
    newIdentityMatrix: newIdentityMatrix,
    newTranslationMatrix: newTranslationMatrix,
    newScaleMatrix: newScaleMatrix,
    newXRotationMatrix: newXRotationMatrix,
    newYRotationMatrix: newYRotationMatrix,
    newZRotationMatrix: newZRotationMatrix,
    newPerspectiveMatrix: newPerspectiveMatrix,
    getPerspectiveCoordinates: getPerspectiveCoordinates,
    getPerspectiveCoordinatesOfArray: getPerspectiveCoordinatesOfArray,
    multiplyMatrixWithMatrix: multiplyMatrixWithMatrix,
    multiplyMatrixWithPoint: multiplyMatrixWithPoint,
    multiplyMatrixWithPointArray: multiplyMatrixWithPointArray,
    getDotProduct: getDotProduct,
    getMinor: getMinor,
    getDeterminant: getDeterminant,
    getTranspose: getTranspose,
    getInverse: getInverse,
    addOffsetToPoint: addOffsetToPoint,
    addOffsetToPointArray: addOffsetToPointArray
};