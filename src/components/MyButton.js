const MyButton = ({ text, type, onClick }) => {
    const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

    return (
        <button className={['MyButton', `MyButton_${btnType}`].join(' ')} onClick={onClick}>
            {text}
        </button>
    );

    // <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
    // <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} />
    // <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} />
    // <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} />
    // <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} />
};

MyButton.defaultProps = {
    type: 'default',
};

export default MyButton;
