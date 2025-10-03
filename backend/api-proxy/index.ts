/**
 * Business: Proxy requests to external API endpoints
 * Args: event with httpMethod, body, queryStringParameters; context with requestId
 * Returns: HTTP response with proxied data
 */

exports.handler = async (event, context) => {
    const { httpMethod, queryStringParameters } = event;
    
    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Api-Url',
                'Access-Control-Max-Age': '86400'
            },
            body: '',
            isBase64Encoded: false
        };
    }
    
    if (httpMethod === 'GET') {
        const targetUrl = queryStringParameters?.url || 'https://functions.poehali.dev/bbe69fb4-2a9a-478e-9b6c-efbfdb5ab40b';
        
        const response = await fetch(targetUrl);
        const data = await response.json();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            isBase64Encoded: false,
            body: JSON.stringify({
                success: true,
                data: data,
                requestId: context.requestId
            })
        };
    }
    
    return {
        statusCode: 405,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        isBase64Encoded: false,
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};