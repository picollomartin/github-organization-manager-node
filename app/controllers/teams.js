const {
  createTeam: createTeamGithub,
  getTeams: getTeamsGithub,
  addMemberToTeam: addMemberToTeamGithub,
  deleteTeam: deleteTeamGithub,
  addMaintainerToTeam: addMaintainerToTeamGithub
} = require('../interactors/teams');

const { getTeamsSerializer } = require('../serializers/teams');

const getTeams = (req, res) =>
  getTeamsGithub(req.query.page, req.query.limit).then(resp =>
    res.send({ teams: getTeamsSerializer(resp), page: req.query.page })
  );
const createTeam = (req, res) => createTeamGithub(req.body.name).then(resp => res.send(resp));
const deleteTeam = (req, res) => deleteTeamGithub(req.params.teamId).then(resp => res.send(resp));
const addMembersToTeam = (req, res) =>
  Promise.all(req.body.usernames.map(user => addMemberToTeamGithub(req.params.teamId, user))).then(resp =>
    res.send(resp)
  );
const addMaintainersToTeam = (req, res) =>
  Promise.all(req.body.usernames.map(user => addMaintainerToTeamGithub(req.params.teamId, user))).then(resp =>
    res.send(resp)
  );

module.exports = { getTeams, createTeam, addMembersToTeam, addMaintainersToTeam, deleteTeam };
