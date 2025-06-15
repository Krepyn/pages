import { useEffect, useState } from 'react';
import { usePlayerStatsContext } from '../../contexts/PlayerStatsContext';
import './ImportStats.css'


function ImportStats() {
    const {playerStats, setPlayerStats} = usePlayerStatsContext();
    const[rawPlayerStats, setRawPlayerStats] = useState(() => {
        const localCreations = localStorage.getItem('PlayerStats');
        return localCreations ? JSON.parse(localCreations) : {};
    });

    // ToDo: Add trycatch
    function parseStats(newRawPlayerStats) {
        // var statArray = newRawPlayerStats.split(/\r?\n|\r|\n/g); // Split into lines
        // statArray = statArray.filter(String) // Delete Empty Lines

        // Regex Splits - Tedious and very manual but dunno a better way to do it ;-;
        const PlayerName = newRawPlayerStats.split(/(?<=export for )(.*)(?=,)/g)[1]

        // Overall progress
        const OverallGameProgress = newRawPlayerStats.split(/(?<=Overall Game Progress: )(.*)(?=%)/g)[1]

        // God Stats
        const EffectiveCreatingSpeed = newRawPlayerStats.split(/(?<=Creating Speed: )(.*?)(?= %)/g)[1]
        const BaseCreatingSpeed = newRawPlayerStats.split(/(?<=Creating Speed:)(.*?)(?= from god power)/g)[1].split(/(?<=base \+ )(.*?)(?= %)/g)[1]                  
        const EffectiveBuildingSpeed = newRawPlayerStats.split(/(?<=Building Speed: )(.*?)(?= %)/g)[1]
        const BaseBuildingSpeed = newRawPlayerStats.split(/(?<=Building Speed:)(.*?)(?= from god power)/g)[1].split(/(?<=Museum \+ )(.*?)(?= %)/g)[1]  
        const CrystalPower = newRawPlayerStats.split(/(?<=Crystal Power: )(.*)/g)[1]
        const CreationCount = newRawPlayerStats.split(/(?<=Creation Count: )(.*)/g)[1]

        // Pets
        const UnlockedPets = newRawPlayerStats.split(/(?<=Unlocked Pets: )(.*)/g)[1]
        const EvolvedPets = newRawPlayerStats.split(/(?<=Evolved Pets: )(.*)/g)[1]
        const TotalPetDL = newRawPlayerStats.split(/(?<=Total Pet Dungeon Levels: )(.*)/g)[1]
        const TotalPetGrowth = newRawPlayerStats.split(/(?<=Total Pet Growth: )(.*)/g)[1]
        const PetStones = newRawPlayerStats.split(/(?<=Pet Stones: )(.*)/g)[1]

        // Dungeons
        const DungeonBossesDefeated = newRawPlayerStats.split(/(?<=Dungeon Bosses defeated: )(.*)/g)[1]

        // Pet Village
        const FishingLevel = newRawPlayerStats.split(/(?<=Fishing Level: )(.*)/g)[1]
        const FishPower = newRawPlayerStats.split(/(?<=Fish Power: )(.*)/g)[1]
        const QuestPoints = newRawPlayerStats.split(/(?<=Quest Points: )(.*)/g)[1]

        // Pet Misc.
        const GDTotalGrowth = newRawPlayerStats.split(/(?<=Growth from Golden Dragon: )(.*)/g)[1]
        const Ants = newRawPlayerStats.split(/(?<=Ants: )(.*)/g)[1]

        // Challenge Points & Upgrades
        const ChP = newRawPlayerStats.split(/(?<=Challenge Points: )(.*)/g)[1]
        const ChPDamageReductionUBs = newRawPlayerStats.split(/(?<=Chp Damage Reduction UBs: )(.*)/g)[1]

        // Overflow Points & Upgrades
        const OfPLeft = newRawPlayerStats.split(/(?<=Overflow Points left: )(.*)/g)[1]

        // Adventure Mode
        const MainLevel = newRawPlayerStats.split(/(?<=Main Level: )(.*)/g)[1]

        // Challenges
        const AACCompletion = newRawPlayerStats.split(/(?<=All Achievements Challenges: )(.*)(?= \/)/g)[1]
        const DMCScore = newRawPlayerStats.split(/(?<=Day Might Challenge highest might: )(.*)/g)[1]
        const DNDCScore = newRawPlayerStats.split(/(?<=Day No Divinity Challenge highest points: )(.*)/g)[1]
        const DPCScore = newRawPlayerStats.split(/(?<=Day Pet Challange highest multi: )(.*)/g)[1]
        const DRCCompletion = newRawPlayerStats.split(/(?<=Double Rebirth Challenges: )(.*)(?= \/)/g)[1]
        const GPCCompletion = newRawPlayerStats.split(/(?<=God Power Challenges: )(.*)(?= \/)/g)[1]
        const UBCCompletion = newRawPlayerStats.split(/(?<=Ultimate Baal Challenges: )(.*)(?= \/)/g)[1]
        const UPCCompletion = newRawPlayerStats.split(/(?<=Ultimate Pet Challenges: )(.*)(?= \/)/g)[1]
        const UUCCompletion = newRawPlayerStats.split(/(?<=Ultimate Universe Challenges: )(.*)(?= \/)/g)[1]


        console.log('Player Name: ' + PlayerName + '\n' +
                    'Effective Creating Speed: ' + EffectiveCreatingSpeed + '\n' +
                    'Base Creating Speed: ' + BaseCreatingSpeed + '\n' +
                    'Effective Building Speed: ' + EffectiveBuildingSpeed + '\n' +
                    'Base Building Speed: ' + BaseBuildingSpeed + '\n' +
                    'Crystal Power: ' + CrystalPower + '\n' +
                    'Creation Count: ' + CreationCount + '\n' +
                    'All Achievements Challenges: ' + AACCompletion + '\n' +
                    ''
        );

        // Setting parsed data into the State
        setPlayerStats({...playerStats, 
                        ['PlayerName']: PlayerName,
                        ['OverallGameProgress']: OverallGameProgress ? OverallGameProgress : 0,
                        ['EffectiveCreatingSpeed']: EffectiveCreatingSpeed ? EffectiveCreatingSpeed : 0,
                        ['BaseCreatingSpeed']: BaseCreatingSpeed ? BaseCreatingSpeed : 0,
                        ['EffectiveBuildingSpeed']: EffectiveBuildingSpeed ? EffectiveBuildingSpeed : 0,
                        ['BaseBuildingSpeed']: BaseBuildingSpeed ? BaseBuildingSpeed: 0
                    })
    }

    function handleImport(event) {
        const newRawPlayerStats = event.target.value;
        // console.log('New Raw Player Stats: ' +newRawPlayerStats);

        setRawPlayerStats(newRawPlayerStats)
    }

    useEffect(() =>{
        function saveData() {
            localStorage.setItem('PlayerStats', JSON.stringify(rawPlayerStats))
        }    
        saveData()
        parseStats(rawPlayerStats)

    }, [rawPlayerStats])

    return(
        <>  
            <form className='import-form'>
                <textarea name='import' className='import-input' type='text' placeholder='Paste Statistics->Other->Export Stats into here.' value={rawPlayerStats} onChange={handleImport} />
            </form>
        </>
    )
}

export default ImportStats;