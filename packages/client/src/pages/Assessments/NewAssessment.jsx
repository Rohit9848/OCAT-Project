import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Form } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    const score = calculateScore(data);
    const riskLevel = calculateRiskLevel(score);
    data.score = score;
    data.riskLevel = riskLevel;
    AssessmentService.submit(data);
  };

  const calculateScore = (data) => {
    let score = 0;
    Object.entries(data).forEach(([ key, value ]) => {
      if (key.indexOf(`question`) > -1) {
        score += parseInt(value);
      }
    });
    return score;
  };

  const calculateRiskLevel = (score) => {
    if (score >= 4) {
      return `High`;
    } else if (score >= 2) {
      return `Medium`;
    }
    return `Low`;
  };

  return <Container className="form-container">
    <Container className="card-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ display: `inline`, marginRight: `10px` }}>Cat Assessment -</h2>
        <h4 style={{ display: `inline` }}>Cat Behavioral Instrument</h4>
        <Form.Control hidden type="text" id="instrumentType" {
          ...register(`instrumentType`)} value="Cat Behavioral Instrument" />
        <hr />
        <h5>Cat Details: </h5>
        <Form.Group>
          <Form.Label htmlFor="catName">Cat Name:
            <Form.Control type="text" id="catName" {...register(`catName`)} />
          </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="catDateOfBirth">Cat Date of Birth:
            <Form.Control type="date" id="catDateOfBirth" {...register(`catDateOfBirth`)} />
          </Form.Label>
        </Form.Group>

        <h5>Questions &amp; Responses: </h5>
        <Form.Label>1. Previous contact with the Cat Judicial System:</Form.Label>
        <Form.Group>
          <Form.Check type="radio" label="No" inline value="0" {...register(`question1`)} />
          <Form.Check type="radio" label="Yes" inline value="1" {...register(`question1`)} />
        </Form.Group>

        <Form.Label>2. Physical altercations with other cats:</Form.Label>
        <Form.Group>
          <Form.Check type="radio" label="0-3 altercations" inline value="0" {...register(`question2`)} />
          <Form.Check type="radio" label="3+ altercations" inline value="1" {...register(`question2`)} />
        </Form.Group>

        <Form.Label>3. Physical altercations with owner (scratching, biting, etc...):</Form.Label>
        <Form.Group>
          <Form.Check type="radio" label="10+ altercations" inline value="1" {...register(`question3`)} />
          <Form.Check type="radio" label="0-10 altercations" inline value="0" {...register(`question3`)} />
        </Form.Group>

        <Form.Label>4. Plays well with dogs:</Form.Label>
        <Form.Group>
          <Form.Check type="radio" label="No" inline value="1" {...register(`question4`)} />
          <Form.Check type="radio" label="Yes" inline value="0" {...register(`question4`)} />
        </Form.Group>

        <Form.Label>5. Hisses at strangers:</Form.Label>
        <Form.Group>
          <Form.Check type="radio" label="Yes" inline value="1" {...register(`question5`)} />
          <Form.Check type="radio" label="No" inline value="0" {...register(`question5`)} />
        </Form.Group>
        <Button type="submit" style={{ marginTop: `20px` }}>Submit</Button>
      </Form>
    </Container>
  </Container>;

};
