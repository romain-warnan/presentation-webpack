import React from "react";

interface ParagrapheProps {
  title: string;
  content: string;
}

const Paragraphe: React.SFC<ParagrapheProps> = ({ title, content }) => (
  <div className="paragraphe">
    <h2 className="titre">{`${title} : `}</h2>
    <div className="contenu" dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export default Paragraphe;
