import Banner from '../components/Banner';

const LandingPage = () => {
  return (
    <div className="font-sans">
      <Banner />
      <main className="my-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Ulearn</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Learn programming, web development, and more from our expert mentors. Sign up today to start your journey.
        </p>
      </main>
    </div>
  );
};

export default LandingPage;
