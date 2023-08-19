import Tour from "./Tour";
function Tours({ tours, removeTour }) {
  return (
    <section>
      <div className="title">
        <h2>Our Tours</h2>
      </div>
      <div className="underline"></div>
      <div className="tours">
        {tours.map((tour) => {
          return <Tour key={tour.id} {...tour} removeTour={removeTour} />;
        })}
      </div>
    </section>
  );
}
export default Tours;
