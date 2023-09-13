import React, { useEffect, useState } from "react";
import Type from "./Type";

const DamageRelations = ({ damages }) => {
  const [dmgPokemon, setDmgPokemon] = useState();

  useEffect(() => {
    const arrDmg = damages.map((damage) => {
      return separateObjToFrom(damage);
    });

    if (arrDmg.length > 1) {
      const obj = joinDmgRel(arrDmg);
      setDmgPokemon(reduceDupVal(postDmgVal(obj.from)));
    } else {
      setDmgPokemon(postDmgVal(arrDmg[0].from));
    }
  }, []);

  const joinObj = (eff, str) => {
    const k = str;
    const firstArrVal = eff[0][k];
    const secondArrVal = eff[1][k];
    const result = Object.entries(secondArrVal).reduce((acc, [k, v]) => {
      const res = firstArrVal[k].concat(v);
      return (acc = { [k]: res, ...acc });
    }, {});
    return result;
  };

  const joinDmgRel = (eff) => {
    return {
      to: joinObj(eff, "to"),
      from: joinObj(eff, "from"),
    };
  };

  const filterForUniqueVal = (target, dmgVal) => {
    const initArr = [];

    return target.reduce((acc, v) => {
      const { url, name } = v;

      const filterACC = acc.filter((a) => a.name !== name);

      return filterACC.length === acc.length
        ? (acc = [v, ...acc])
        : (acc = [{ dmgVal: dmgVal, name, url }, ...filterACC]);
    }, initArr);
  };

  const reduceDupVal = (eff) => {
    const dupVal = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };

    return Object.entries(eff).reduce((acc, [k, v]) => {
      const key = k;
      const verifiedValue = filterForUniqueVal(v, dupVal[key]);
      return (acc = { [k]: verifiedValue, ...acc });
    }, {});
  };

  const postDmgVal = (eff) => {
    const res = Object.entries(eff).reduce((acc, [k, v]) => {
      const key = k;
      const valueOfKey = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };
      return (acc = {
        [k]: v.map((i) => {
          return { dmgVal: valueOfKey[key], ...i };
        }),
        ...acc,
      });
    }, {});
    return res;
  };
  const filterDmgRel = (rel, damage) => {
    const res = Object.entries(damage)
      .filter(([k, v]) => {
        return k.includes(rel);
      })
      .reduce((acc, [k, v]) => {
        const renamedKey = k.replace("_" + rel, "");
        return (acc = { [renamedKey]: v, ...acc });
      }, {});

    return res;
  };

  const separateObjToFrom = (damage) => {
    const from = filterDmgRel("from", damage);
    const to = filterDmgRel("to", damage);
    return { from, to };
  };

  return (
    <div className="flex gap-2 flex-col">
      {dmgPokemon ? (
        <React.Fragment>
          {Object.entries(dmgPokemon).map(([k, v]) => {
            const key = k;
            const value = {
              double_damage: "Weak",
              half_damage: "Resistant",
              no_damage: "Immune",
            };

            return (
              <div key={key}>
                <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                  {value[key]}
                </h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {v.length > 0 ? (
                    v.map(({ name, url, dmgVal }) => {
                      return <Type type={name} key={url} dmgVal={dmgVal} />;
                    })
                  ) : (
                    <Type type={"none"} key={"none"} />
                  )}
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DamageRelations;
