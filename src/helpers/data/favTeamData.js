const teamColors = [
  {
    team: 'Los Angeles Angels',
    acronym: 'LAA',
    primaryColor: '#003263',
    secondColor: '#BA0021',
  },
  {
    team: 'St Louis Cardinals',
    acronym: 'STL',
    primaryColor: '#0C2340',
    secondColor: '#C41E3A',
  },
  {
    team: 'Arizona Diamondbacks',
    acronym: 'ARI',
    primaryColor: '#E3D4AD',
    secondColor: '#A71930',
  },
  {
    team: 'New York Mets',
    acronym: 'NYM',
    primaryColor: '#002D72',
    secondColor: '#FF5910',
  },
  {
    team: 'Philidelphia Phillies',
    acronym: 'PHI',
    primaryColor: '#002D72',
    secondColor: '#E81828',
  },
  {
    team: 'Detriot Tigers',
    acronym: 'DET',
    primaryColor: '#0C2340',
    secondColor: '#FA4616',
  },
  {
    team: 'Colorado Rockies',
    acronym: 'COL',
    primaryColor: '#C4CED4',
    secondColor: '#33006F',
  },
  {
    team: 'Los Angeles Dodgers',
    acronym: 'LAD',
    primaryColor: '#005A9C',
    secondColor: '#EF3E42',
  },
  {
    team: 'Boston Red Sox',
    acronym: 'BOS',
    primaryColor: '#0C2340',
    secondColor: '#BD3039',
  },
  {
    team: 'Texas Rangers',
    acronym: 'TEX',
    primaryColor: '#003278',
    secondColor: '#C0111F',
  },
  {
    team: 'Cincinnati Reds',
    acronym: 'CIN',
    primaryColor: '#000000',
    secondColor: '#C6011F',
  },
  {
    team: 'Chicago White Sox',
    acronym: 'CWS',
    primaryColor: '#C4CED4',
    secondColor: '#27251F',
  },
  {
    team: 'Kansas City Royals',
    acronym: 'KAN',
    primaryColor: '#004687',
    secondColor: '#BD9B60',
  },
  {
    team: 'Miami Marlins',
    acronym: 'FLA',
    primaryColor: '#00A3E0',
    secondColor: '#EF3340',
  },
  {
    team: 'Milwaukee Brewers',
    acronym: 'MIL',
    primaryColor: '#12284B',
    secondColor: '#FFC52F',
  },
  {
    team: 'Huston Astros',
    acronym: 'HOU',
    primaryColor: '#002D62',
    secondColor: '#EB6E1F',
  },
  {
    team: 'Washington Nationals',
    acronym: 'WAS',
    primaryColor: '#14225A',
    secondColor: '#AB0003',
  },
  {
    team: 'Oakland Athletics',
    acronym: 'OAK',
    primaryColor: '#003831',
    secondColor: '#EFB21E',
  },
  {
    team: 'San Francisco Giants',
    acronym: 'SF',
    primaryColor: '#27251F',
    secondColor: '#FD5A1E',
  },
  {
    team: 'Baltimore Orioles',
    acronym: 'BAL',
    primaryColor: '#000000',
    secondColor: '#DF4601',
  },
  {
    team: 'Pittsburgh Pirates',
    acronym: 'PIT',
    primaryColor: '#27251F',
    secondColor: '#FDB827',
  },
  {
    team: 'Cleveland Indians',
    acronym: 'CLE',
    primaryColor: '#0C2340',
    secondColor: '#E31937',
  },
  {
    team: 'Toronto Blue Jays',
    acronym: 'TOR',
    primaryColor: '#134A8E',
    secondColor: '#E8291C',
  },
  {
    team: 'Seattle Mariners',
    acronym: 'SEA',
    primaryColor: '#0C2C56',
    secondColor: '#005C5C',
  },
  {
    team: 'Minnesota Twins',
    acronym: 'MIN',
    primaryColor: '#002B5C',
    secondColor: '#D31145',
  },
  {
    team: 'Tampa Bay Rays',
    acronym: 'TB',
    primaryColor: '#092C5C',
    secondColor: '#8FBCE6',
  },
  {
    team: 'Atlanta Braves',
    acronym: 'ATL',
    primaryColor: '#13274F',
    secondColor: '#CE1141',
  },
  {
    team: 'Chicago Cubs',
    acronym: 'CHC',
    primaryColor: '#0E3386',
    secondColor: '#CC3433',
  },
  {
    team: 'New York Yankees',
    acronym: 'NYY',
    primaryColor: '#003087',
    secondColor: '#E4002C',
  },
];

const getTeamColorsByAcro = (Acro) => teamColors.find((team) => team.acronym === Acro);

const teamColorData = () => teamColors;

export default { getTeamColorsByAcro, teamColorData };
