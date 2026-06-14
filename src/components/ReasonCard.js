export default function ReasonCard({ number, reason, image }) {
  return (
    <article className="reason-card" tabIndex={0}>
      <div className="reason-inner">
        {/* Front */}
        <div className="reason-front">
          <h3>{number}</h3>
          <p className="text-base opacity-70 mt-3">tap love note</p>
        </div>
        {/* Back */}
        <div
          className="reason-back"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(62,50,50,.08), rgba(62,50,50,.18) 45%, rgba(62,50,50,.78)), url('${image}')`,
          }}
        >
          <p>{reason}</p>
        </div>
      </div>
    </article>
  );
}
