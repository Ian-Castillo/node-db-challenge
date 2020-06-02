const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

// POST Resource
router.post('/resources', (req, res) => {
    const resourceData = req.params.body;

    Projects.addResource(resourceData)
        .then(resource => {
            res.status(201).json(resource)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to post resource' });
        });
});

// GET Resources
router.get('/resouces', (req, res) => {
    Projects.getResources()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve resources' })
        })
});

// POST Project
router.post('/', (req, res) => {
    const projectData = req.body;

    Projects.addProject(projectData)
        .then(projectId => {
            res.status(201).json({ message: `Project successfully added and assigned id ${projectId}` })
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to post project' });
        });
});

// GET Projects
router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve projects' });
        });
});

// POST Task
router.post('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskData = req.body;

    Projects.addTask(taskData)
        .then(taskId => {
            res.status(201).json(taskId);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to post task' });
        });
});

// GET Tasks by project_id
router.get('/tasks', (req, res) => {
    Projects.getTasks()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve tasks' })
        })
});

module.exports = router;