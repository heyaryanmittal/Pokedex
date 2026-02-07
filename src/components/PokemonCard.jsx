import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ data, region }) => {
    if (!data) return null;

    const { name, height, weight, abilities, sprites, id } = data;

    const heightInFeet = (height * 0.1 * 3.28084).toFixed(2);
    const weightInKg = (weight * 0.1).toFixed(1);

    return (
        <div className="card-container">
            <div className="image-wrapper">
                <img
                    src={sprites.other['official-artwork'].front_default || sprites.front_default}
                    alt={name}
                    className="pokemon-image"
                />
            </div>

            <div className="info-wrapper">
                <div className="card-header">
                    <h2 className="pokemon-name">{name}</h2>
                    {region && <span className="pokemon-region">Region: {region}</span>}
                </div>

                <div className="stats-grid">
                    <div className="stat-row">
                        <span className="stat-label">Height:</span>
                        <span className="stat-value">{heightInFeet} Feet</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Weight:</span>
                        <span className="stat-value">{weightInKg} kg</span>
                    </div>
                    <div className="stat-abilities">
                        <span className="stat-label">Abilities:</span>
                        <ul className="ability-list">
                            {abilities.map((abilityInfo) => (
                                <li key={abilityInfo.ability.name} className="ability-item">
                                    {abilityInfo.ability.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="stat-abilities">
                        <span className="stat-label">Moves:</span>
                        <ul className="ability-list">
                            {data.moves && data.moves.slice(0, 4).map((moveInfo) => (
                                <li key={moveInfo.move.name} className="ability-item move-item">
                                    {moveInfo.move.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
