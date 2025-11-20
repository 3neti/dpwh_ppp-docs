document.addEventListener('DOMContentLoaded', function() {
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        themeVariables: {
            primaryColor: '#1976d2',
            primaryTextColor: '#fff',
            primaryBorderColor: '#1565c0',
            lineColor: '#424242',
            secondaryColor: '#e3f2fd',
            tertiaryColor: '#fff'
        },
        flowchart: {
            htmlLabels: true,
            curve: 'basis'
        }
    });
    
    // Add custom CSS to make edge labels fully transparent with no shadows
    const style = document.createElement('style');
    style.textContent = `
        /* Remove rectangle backgrounds */
        .edgeLabel rect {
            fill: transparent !important;
            stroke: transparent !important;
            opacity: 0 !important;
            display: none !important;
        }
        
        /* Remove container backgrounds */
        .edgeLabel .label-container,
        .edgeLabel foreignObject,
        .edgeLabel foreignObject > div,
        .edgeLabel > div {
            background: transparent !important;
            background-color: transparent !important;
        }
        
        /* Target all text elements */
        .edgeLabel span,
        .edgeLabel p,
        .edgeLabel div,
        .edgeLabel tspan,
        .edgeLabel text {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            text-shadow: none !important;
            padding: 0 !important;
            font-size: 11px !important;
            text-transform: lowercase !important;
        }
        
        /* Main edge label element */
        .edgeLabel {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
        }
        
        /* Catch-all for any child elements */
        svg .edgeLabel *,
        .edgeLabel * {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            filter: none !important;
        }
    `;
    document.head.appendChild(style);
});
