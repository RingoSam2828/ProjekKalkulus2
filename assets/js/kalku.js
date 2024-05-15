function compute() {
    let vectorA = document.getElementById('vectorA').value.split(',').map(Number);
    let vectorB = document.getElementById('vectorB').value.split(',').map(Number);

    // Preparing the formulas with descriptions
    let angleResult = calculateAngle(vectorA, vectorB);
    let additionFormula = '<p><strong>Operasi Penjumlahan:</strong></p>' + formatVectorOperationCombined(vectorA, vectorB, "+");
    let subtractionFormula = '<p><strong>Operasi Pengurangan:</strong></p>' + formatVectorOperationCombined(vectorA, vectorB, "-");
    let dotProductFormula = '<p><strong>Operasi Perkalian (Dot Product):</strong></p>' + formatDotProductCombined(vectorA, vectorB);
    let angleFormula = `
        <div>${angleResult.formula}</div>
        <div>${angleResult.steps}</div>
    `;

    // Setting the innerHTML of the result element to include descriptions and formulas
    document.getElementById('result').innerHTML = `
        <div>${additionFormula}</div>
        <div>${subtractionFormula}</div>
        <div>${dotProductFormula}</div>
        ${angleFormula}
    `;

    // Ask MathJax to process the new content
    MathJax.typesetPromise && MathJax.typesetPromise();
}


function formatVectorAsMatrix(vector) {
    return '\\begin{bmatrix}' + vector.join('\\\\') + '\\end{bmatrix}';
}

function vectorMagnitude(vector) {
    return Math.sqrt(vector.reduce((acc, val) => acc + val * val, 0));
}

function calculateAngle(vectorA, vectorB) {
    let dot = dotProduct(vectorA, vectorB);
    let magnitudeA = vectorMagnitude(vectorA);
    let magnitudeB = vectorMagnitude(vectorB);
    let cosTheta = dot / (magnitudeA * magnitudeB);
    let angleRadians = Math.acos(cosTheta);
    let angleDegrees = angleRadians * (180 / Math.PI);

    let angleFormula = `<p><strong>Sudut antara dua vektor:</strong> ${angleDegrees.toFixed(2)}°</p>`;
    let angleSteps = formatAngleCalculationSteps(vectorA, vectorB);

    return {
        angle: angleDegrees.toFixed(2),
        formula: angleFormula,
        steps: angleSteps
    };
}


// Function to format operation steps for addition and subtraction
function formatOperationSteps(vectorA, vectorB, operation) {
    let steps = "Steps:<br>";
    vectorA.forEach((value, index) => {
        steps += `${value} ${operation} ${vectorB[index]} = ${operation === "+" ? value + vectorB[index] : value - vectorB[index]}<br>`;
    });
    return steps;
}

function formatVectorOperationCombined(vectorA, vectorB, operation) {
    let stepsLatex = "\\["; // Start MathJax formula
    let operationSymbol = operation === "+" ? "+" : "-";
    stepsLatex += formatVectorAsMatrix(vectorA) + "\\ " + operationSymbol + "\\ " + formatVectorAsMatrix(vectorB);
    stepsLatex += "\\ =\\ "; // Add equals sign
    let resultVector = operation === "+" ? addVectors(vectorA, vectorB) : subtractVectors(vectorA, vectorB);
    stepsLatex += formatVectorAsMatrix(resultVector);
    stepsLatex += "\\]"; // End MathJax formula
    return stepsLatex;
}


function formatDotProductCombined(vectorA, vectorB) {
    let stepsLatex = "\\["; // Start MathJax display formula (without extra backslash)

    // Setup the multiplication steps
    let multiplicationSteps = vectorA.map((a, i) => `${a} \\cdot ${vectorB[i]}`).join(' + ');

    // Calculate the dot product result
    let result = dotProduct(vectorA, vectorB);

    // Compile the full formula: steps + result
    stepsLatex += multiplicationSteps + "\\ =\\ " + result;

    stepsLatex += "\\]"; // End MathJax display formula (without extra backslash)

    return stepsLatex;
}

function addVectors(vectorA, vectorB) {
    // Ensure both vectors are of the same length
    if (vectorA.length !== vectorB.length) {
        console.error("Vectors are of different lengths.");
        return [];
    }

    let resultVector = [];
    for (let i = 0; i < vectorA.length; i++) {
        resultVector.push(vectorA[i] + vectorB[i]);
    }
    return resultVector;
}

function subtractVectors(vectorA, vectorB) {
    // Ensure both vectors are of the same length
    if (vectorA.length !== vectorB.length) {
        console.error("Vectors are of different lengths.");
        return [];
    }

    let resultVector = [];
    for (let i = 0; i < vectorA.length; i++) {
        resultVector.push(vectorA[i] - vectorB[i]);
    }
    return resultVector;
}

function dotProduct(vectorA, vectorB) {

    // Ensure both vectors are of the same length
    if (vectorA.length !== vectorB.length) {
        console.error("Vectors are of different lengths.");
        return null;
    }
    let result = 0;
    for (let i = 0; i < vectorA.length; i++) {
        result += vectorA[i] * vectorB[i];
    }
    return result;
}  


    
function showCalculator() {
    
    document.getElementById('intro-page').style.display = 'none';
    document.getElementById('calculator-page').style.display = 'block';
    }
function vectorMagnitude(vector) {
  return Math.sqrt(vector.reduce((acc, val) => acc + val * val, 0));
}

function showCalculatorAndScroll() {
    // Tampilkan kalkulator jika tersembunyi
    var calculatorPage = document.getElementById('calculator-page');
    
    // Memastikan elemen kalkulator ditampilkan sebelum melanjutkan
    calculatorPage.style.display = 'block';
    
    // Gunakan smooth scroll ke elemen tersebut
    calculatorPage.scrollIntoView({ behavior: 'smooth' });
}

function formatAngleCalculationSteps(vectorA, vectorB) {
    let dot = dotProduct(vectorA, vectorB);
    let magnitudeA = vectorMagnitude(vectorA);
    let magnitudeB = vectorMagnitude(vectorB);
    let cosTheta = dot / (magnitudeA * magnitudeB);
    let angleRadians = Math.acos(cosTheta);
    let angleDegrees = angleRadians * (180 / Math.PI);

    let stepsLatex = "\\begin{aligned}"; // Start MathJax aligned environment

    // Step 1: Calculate the dot product
    let dotProductSteps = formatDotProductCombined(vectorA, vectorB).replace(/^\\\[|\\\]$/g, '');
    stepsLatex += "&\\text{Dot Product: } " + dotProductSteps + "\\\\" + "\\\\";

    // Step 2: Calculate the magnitudes
    stepsLatex += "&\\text{Besar Vector A: } \\|\\vec{a}\\| = " + magnitudeA.toFixed(2) + "\\\\"; 
    stepsLatex += "&\\text{Besar Vector B: } \\|\\vec{b}\\| = " + magnitudeB.toFixed(2) + "\\\\" + "\\\\";

    // Step 3: Calculate the cosine of the angle
    stepsLatex += "&\\cos(\\theta) = \\frac{\\vec{a} \\cdot \\vec{b}}{\\|\\vec{a}\\| \\|\\vec{b}\\|} = \\frac{" + dot + "}{" + magnitudeA.toFixed(2) + " \\times " + magnitudeB.toFixed(2) + "} = " + cosTheta.toFixed(2) + "\\\\" + "\\\\";

    // Step 4: Calculate the angle in radians
    stepsLatex += "&\\theta = \\cos^{-1}(" + cosTheta.toFixed(2) + ") = " + angleRadians.toFixed(2) + " \\text{ radians}\\\\" + "\\\\";

    // Step 5: Convert angle from radians to degrees
    stepsLatex += "&\\theta = " + angleRadians.toFixed(2) + " \\text{ radians} \\times \\frac{180^\\circ}{\\pi} = " + angleDegrees.toFixed(2) + "^\\circ";

    stepsLatex += "\\end{aligned}"; // End MathJax aligned environment

    return stepsLatex;
}

