export const success = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f2f2f2;
            padding: 50px;
        }
        .success-icon {
            font-size: 60px;
            color: purple;
        }
        .message {
            font-size: 24px;
            margin-top: 20px;
          color : purple;
        }
    </style>
</head>
<body>
    <div class="success-icon">&#10004;</div>
  <div class="message">Payment Successful</div>
</body>
</html>
`;

export const error = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f2f2f2;
            padding: 50px;
        }
        .error-icon {
            font-size: 60px;
            color : purple;
        }
        .message {
            font-size: 24px;
            margin-top: 20px;
            color : purple;
        }
    </style>
</head>
<body>
    <div class="error-icon">&#9888;</div>
    <div class="message">Something Went Wrong</div>
</body>
</html>
`;
