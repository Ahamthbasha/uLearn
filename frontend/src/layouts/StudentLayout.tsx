import Header from '../components/Header';
import Footer from '../components/Footer';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout = ({ children }: StudentLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default StudentLayout;
