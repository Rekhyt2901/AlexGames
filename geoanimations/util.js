function loadFile(filePath) {
    let xml = new XMLHttpRequest();
    xml.open("GET", filePath, false);
    xml.send();
    if (xml.status == 200) {
        return xml.responseText;
    } else {
        return xml.response;
    }
}

function parseObj(ptext) {
    let text = ptext.split("\n").map(line => line.split(" "));

    let vertices = [];
    let vertexTextures = [];
    let vertexNormals = [];
    let faces = [];

    let unparsedLines = [];

    for (let i = 0; i < text.length; i++) {
        let prefix = text[i][0];
        let line = text[i];
        line.shift();
        // console.log(line);

        if (prefix === "#") { // comment
        } else if (prefix === "v") { // geometrix vertex coordinates with x,y,z,[w]

            vertices.push([line[0], line[1], line[2], line[3] === undefined ? 1 : line[3]]);

        } else if (prefix === "vt") { // texture coordinates with u, [v,[w]]

            vertexTextures.push([line[0], line[1], line[2]]);

        } else if (prefix === "vn") { // vertex normal with x,y,z

            vertexNormals.push([line[0], line[1], line[2], 1]);

        } else if (prefix === "f") { // face element in format: list of: vertex_index/texture_index/normal_index    INDEXs START AT 1!

            line = line.map(item => item.split("/"));
            line = line.map(item => {
                return {
                    vertexIndex: item[0],
                    textureIndex: item[1],
                    normalIndex: item[2]
                }
            });
            faces.push(line);

        } else if (prefix === "vp ") { // parameter space vertices with u, [v, [w]]
        } else if (prefix === "l ") { // Polyline in form of list of vertex indexes: 1 5 8 2 3     INDEXs START AT 1!
        } else {
            unparsedLines.push(line);
        }
    }
    faces.map(face => {
        for(let i = 0; i < face.length; i++) {
            (face[i].vertexIndex < 1) ? face[i].vertexIndex += vertices.length : face[i].vertexIndex--;
            (face[i].textureIndex < 1) ? face[i].textureIndex += vertexTextures.length : face[i].textureIndex--;
            (face[i].normalIndex < 1) ? face[i].normalIndex += vertexNormals.length : face[i].normalIndex--;
        }
    });

    return {
        vertices: vertices,
        vertexTextures: vertexTextures,
        vertexNormals: vertexNormals,
        faces: faces,
        unparsedLines: unparsedLines
    };
}

export default {
    loadFile: loadFile,
    parseObj: parseObj
};