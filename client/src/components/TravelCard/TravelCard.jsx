import React from "react";
import "./TravelCard.css";

function TravelCard(props) {
  const { photos, title, description, tags, url, hasShareIcon = false } = props;

  // จำกัดความยาวของ description ไม่เกิน 100 ตัวอักษร
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <article className="travel-card">
      <div className="card-content">
        <div className="main-image-container">
          <img src={photos[0]} alt={title} className="main-image" />
        </div>

        <div className="card-details">
          <h2 className="card-title">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h2>
          <p className="card-description">{truncateDescription(description)}</p>

          <div className="card-actions">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more"
            >
              อ่านต่อ
            </a>
            <div className="categories">
              {tags.map((tag, index) => (
                <span key={index} className="category-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="thumbnail-images">
            {photos.slice(1, 4).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index + 2}`}
                className="thumbnail"
              />
            ))}
          </div>
        </div>

        {hasShareIcon && (
          <div className="share-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
          </div>
        )}
      </div>
    </article>
  );
}

export default TravelCard;
