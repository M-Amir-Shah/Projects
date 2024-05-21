import React from 'react';

const App = () => {
    return (
        <div style={styles.container}>
            <p style={styles.paragraph}>Barani Institute of Information Technology (BIIT) was established at the Pir Mehr Ali Shah Arid Agriculture University[1] and is located in Rawalpindi, Punjab, Pakistan[2] The institute is a self-financed/ self-funded project and was established as a partnership venture between the Pir Mehr Ali Shah Arid Agriculture University and Resource Organizers and Software Engineers (ROSE) International.[3]</p>
            <p style={styles.paragraph}>Integer sagittis libero sed turpis posuere tincidunt. Nullam et elit in est cursus congue. Phasellus ac tellus non velit ultrices bibendum vel in ante.</p>
            <p style={styles.paragraph}>Vivamus volutpat justo et felis aliquam, vel lobortis ex viverra. Morbi varius pretium felis, a ultricies elit gravida sit amet. Donec id leo in ante vehicula tincidunt.</p>
        </div>
    );
};

// Define styles object
const styles = {
    container: {
        background:'pink',
        display:'felx',
        alignItem:'center',
        maxWidth: '800px', // Adjust the maximum width as needed
        margin: '0 auto', // Center the content horizontally
        padding: '20px', // Add padding around the content
    },
    paragraph: {
        userSelect: 'none',
        fontSize: '16px', // Set the font size
        lineHeight: '1.6', // Set the line height
        marginBottom: '20px', // Add margin bottom between paragraphs
    },
};

export default App;
