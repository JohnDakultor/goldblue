    import { AccumulationManager } from "../services/autoAccumulation.js";

    class autoAccumulateControler{
        static autoAccumulate = async (req, res) => {
            const { action } = req.body;
        
            if (action === 'start') {
            AccumulationManager.startAccumulation(); // Start the accumulation process if not already started
            res.status(200).send({ message: 'Accumulation started' });
            } else if (action === 'stop') {
            AccumulationManager.stopAccumulation(); // Stop the accumulation process
            res.status(200).send({ message: 'Accumulation stopped' });
            } else {
            res.status(400).send({ message: 'Invalid action' });
            }
        }

    }

    export { autoAccumulateControler };

