"use client";

const ClipBoard = ({ address, currencyName }) => {
    return (
        <li
            className="partytime-button cursor-pointer"
            onClick={() => {
                navigator.clipboard.writeText(address);
                alert("Address copied to clipboard");
            }}
        >
            {currencyName}
        </li>
    );
};

export default ClipBoard;
