import React from "react";
import PropTypes from "prop-types";

export default function AnimalCard({
  name,
  scientificName,
  size,
  diet,
  image,
  additional,
  showAdditional,
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        width: "250px",
        backgroundColor: "#ffc107",
        textAlign: "center",
      }}
    >
      {image && (
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      )}
      <h2 style={{ margin: "10px 0 5px" }}>{name}</h2>
      <p style={{ margin: "5px 0", fontSize: "14px", fontStyle: "italic" }}>
        Scientific Name: {scientificName}
      </p>
      <p style={{ margin: "5px 0" }}>{size} kg</p>
      <p style={{ margin: "5px 0" }}>{diet.join(", ")}</p>
      <button
        onClick={() => showAdditional(additional)}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        More Info
      </button>
    </div>
  );
}

// Khai báo PropTypes
AnimalCard.propTypes = {
  name: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  diet: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string,
  showAdditional: PropTypes.func.isRequired,
  additional: PropTypes.shape({
    link: PropTypes.string,
    notes: PropTypes.string,
  }),
};

// Khai báo defaultProps cho prop không bắt buộc (additional)
AnimalCard.defaultProps = {
  additional: {
    notes: "No Additional Information",
  },
};
