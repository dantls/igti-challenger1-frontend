import React from 'react';
import ReadOnlyInput from './components/ReadOnlyInput';
import { calculateSalaryFrom  } from './helpers/salary';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      salary: 0,

      calculations: {
        baseINSS: 0,
        discountINSS: 0,
        baseIRPF: 0,
        discountIRPF: 0,
        netSalary: 0
      },
    };
  }
  componentDidUpdate(_, previousState) {
    const { salary: oldNumber } = previousState;
    const { salary: newNumber } = this.state;

    if (oldNumber !== newNumber) {
      const calculations = calculateSalaryFrom(this.state.salary);
      this.setState({ calculations });
    }
  }

  handleInputChange = (event) => {
    const newSalary = Number(event.target.value);
    this.setState({ salary: newSalary });
  };


  render() {
    const { salary, calculations } = this.state;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculations;

    return (
      <div>
        <h1>React Calculator</h1>

        <label>
          <span>Número: </span>
          <input
            type='Salário Base'
            value={salary}
            onChange={this.handleInputChange}
          />
        </label>

        <br />
        <br />

        <ReadOnlyInput description='Base INSS: ' value={baseINSS} />
        <ReadOnlyInput description='Desconto INSS: ' value={discountINSS} />
        <ReadOnlyInput description='Base IRPF: ' value={baseIRPF} />
        <ReadOnlyInput description='Desconto IRPF: ' value={discountIRPF} />
        <ReadOnlyInput description='Salário líquido: ' value={netSalary} />

        <br />

      </div>
    );
  }
}
