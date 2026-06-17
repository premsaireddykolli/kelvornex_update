import Layout from '../components/Layout';
import AdvancedProgramsComponent from '../components/AdvancedPrograms';

const AdvancedPrograms = () => {
  return (
    <Layout 
      title="Advanced Programs" 
      description="Advanced Programs at Kelvornex: Deep dive courses for technical mastery."
      hideBanner={true}
      bgClass="bg-white"
    >
      <div className="pt-10">
        <AdvancedProgramsComponent />
      </div>
    </Layout>
  );
};

export default AdvancedPrograms;
