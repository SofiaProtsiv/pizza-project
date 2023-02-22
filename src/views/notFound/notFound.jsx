import "./notFound.scss";
export default function NotFound() {
  return (
    <div className="root">
      <h1>
        <span>😕</span>
        <br />
        Nothing found
      </h1>
      <p className="description">
        Sorry, this page is not available in our online store.
      </p>
    </div>
  );
}
