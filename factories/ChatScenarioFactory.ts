import {
  chatCoverage,
  ChatCoverageScenario,
  TestLevel,
} from '../data/chatCoverage';

export class ChatScenarioFactory {
  static all(): ChatCoverageScenario[] {
    return chatCoverage;
  }

  static byLevel(level: TestLevel): ChatCoverageScenario[] {
    return chatCoverage.filter(
      scenario => scenario.level.includes(level)
    );
  }

  static smoke(): ChatCoverageScenario[] {
    return this.byLevel('smoke');
  }

  static regression(): ChatCoverageScenario[] {
    return this.byLevel('regression');
  }

  static contract(): ChatCoverageScenario[] {
    return this.byLevel('contract');
  }

  static integration(): ChatCoverageScenario[] {
    return this.byLevel('integration');
  }

  static negative(): ChatCoverageScenario[] {
    return this.byLevel('negative');
  }

  static e2e(): ChatCoverageScenario[] {
    return this.byLevel('e2e');
  }
}