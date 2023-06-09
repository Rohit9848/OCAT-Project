const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  await Assessment.create({
    catDateOfBirth: assessment.catDateOfBirth,
    catName: assessment.catName,
    instrumentType: assessment.instrumentType,
    riskLevel: assessment.riskLevel,
    score: assessment.score,
  }).catch((error) => {
    if (error) {
      throw error;
    }
  });
};

exports.getList = () => {
  const assessments = Assessment.findAll();
  return assessments;
};

exports.deleteAssessment = async (assessmentId) => {

  const assessment = await Assessment.findByPk(assessmentId);
  if (!assessment) {
    throw new Error(`Assessment not found`);
  }

  await Assessment.destroy({ where: { id: assessmentId } });
};
