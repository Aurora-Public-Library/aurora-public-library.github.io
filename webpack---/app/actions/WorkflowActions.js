import WorkflowConstants from '../constants/WorkflowConstants';

function updateWorkflow(workflowId, workflow, view, authRequired = true, accountRequired = false) {
  return {
    type: WorkflowConstants.UPDATE_WORKFLOW,
    payload: {
      id: workflowId,
      workflow,
      view
    },
    middlewareData: {
      authRequired,
      accountRequired
    }
  };
}

export default {
  updateWorkflow
};
