// Transcrypt'ed from Python, 2021-10-13 11:44:35
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {choice, random, seed} from './random.js';
var __name__ = '__main__';
export var DRUG_NAMES = ['Penicillin', 'Carbapenemase', 'Colistin'];
export var Params =  __class__ ('Params', [object], {
	__module__: __name__,
	NUM_TIMESTEPS: 100,
	POPULATION_SIZE: 2000,
	INITIALLY_INFECTED: 10,
	DRUG_NAMES: DRUG_NAMES.__getslice__ (0, null, 1),
	PROBABILITY_MOVE_UP_TREATMENT: 0.2,
	TIMESTEPS_MOVE_UP_LAG_TIME: 5,
	ISOLATION_THRESHOLD: DRUG_NAMES.index ('Colistin'),
	PRODUCT_IN_USE: true,
	PROBABILIY_PRODUCT_DETECT: 1,
	PRODUCT_DETECTION_LEVEL: DRUG_NAMES.index ('Carbapenemase'),
	PROBABILITY_GENERAL_RECOVERY: 0,
	PROBABILITY_TREATMENT_RECOVERY: 0.3,
	PROBABILITY_MUTATION: 0.25,
	PROBABILITY_DEATH: 0.015,
	DEATH_FUNCTION: (function __lambda__ (p, t) {
		return round (min (0.001 * t + p, 1), 4);
	}),
	PROBABILITY_SPREAD: 0.25,
	NUM_SPREAD_TO: 1,
	get reset_granular_parameters () {return function () {
		Params.DRUG_PROPERTIES = dict ({});
		Params.DRUG_PROPERTIES ['Penicillin'] = tuple ([Params.PROBABILITY_TREATMENT_RECOVERY]);
		Params.DRUG_PROPERTIES ['Carbapenemase'] = tuple ([Params.PROBABILITY_TREATMENT_RECOVERY]);
		Params.DRUG_PROPERTIES ['Colistin'] = tuple ([Params.PROBABILITY_TREATMENT_RECOVERY]);
		Params.NUM_RESISTANCES = len (Params.DRUG_NAMES);
		Params.RESISTANCE_PROPERTIES = dict ({});
		Params.RESISTANCE_PROPERTIES ['None'] = tuple ([Params.PROBABILITY_GENERAL_RECOVERY, Params.PROBABILITY_MUTATION, Params.PROBABILITY_SPREAD, Params.NUM_SPREAD_TO, Params.PROBABILITY_DEATH, Params.DEATH_FUNCTION]);
		Params.RESISTANCE_PROPERTIES ['Penicillin'] = tuple ([Params.PROBABILITY_GENERAL_RECOVERY, Params.PROBABILITY_MUTATION, Params.PROBABILITY_SPREAD, Params.NUM_SPREAD_TO, Params.PROBABILITY_DEATH, Params.DEATH_FUNCTION]);
		Params.RESISTANCE_PROPERTIES ['Carbapenemase'] = tuple ([Params.PROBABILITY_GENERAL_RECOVERY, Params.PROBABILITY_MUTATION, Params.PROBABILITY_SPREAD, Params.NUM_SPREAD_TO, Params.PROBABILITY_DEATH, Params.DEATH_FUNCTION]);
		Params.RESISTANCE_PROPERTIES ['Colistin'] = tuple ([Params.PROBABILITY_GENERAL_RECOVERY, Params.PROBABILITY_MUTATION, Params.PROBABILITY_SPREAD, Params.NUM_SPREAD_TO, Params.PROBABILITY_DEATH, Params.DEATH_FUNCTION]);
	};}
});
Params.reset_granular_parameters ();
export var Settings =  __class__ ('Settings', [object], {
	__module__: __name__,
	RANDOM_SEED: 0,
	REPORT_PROGRESS: true,
	REPORT_PERCENTAGE: 5,
	REPORT_MOD_NUM: null,
	PRINT_DATA: true
});
export var Infection =  __class__ ('Infection', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, resistance, time_treated) {
		self.resistance = resistance;
		self.general_recovery_probability = Params.RESISTANCE_PROPERTIES [resistance] [0];
		self.mutation_probability = Params.RESISTANCE_PROPERTIES [resistance] [1];
		self.spread_probability = Params.RESISTANCE_PROPERTIES [resistance] [2];
		self.num_spread_to = Params.RESISTANCE_PROPERTIES [resistance] [3];
		self.death_probability = Params.RESISTANCE_PROPERTIES [resistance] [4];
		self.death_function = Params.RESISTANCE_PROPERTIES [resistance] [5];
		self.time_treated = time_treated;
	});},
	get make_resistant () {return __get__ (this, function (self, resistance) {
		self.__init__ (resistance, self.time_treated);
	});},
	get is_resistant () {return __get__ (this, function (self, resistance) {
		return self.get_tier () >= Infection.get_tier_from_resistance (resistance);
	});},
	get get_tier () {return __get__ (this, function (self) {
		return Infection.get_tier_from_resistance (self.resistance);
	});},
	get get_tier_from_resistance () {return function (resistance) {
		if (resistance == 'None') {
			return -(1);
		}
		else {
			return Params.DRUG_NAMES.index (resistance);
		}
	};},
	get duplicate () {return __get__ (this, function (self) {
		return Infection (self.resistance, self.time_treated);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (self.resistance == 'None') {
			return 'infected';
		}
		else {
			return 'infected with resistance up to: {}'.format (self.resistance);
		}
	});}
});
export var Treatment =  __class__ ('Treatment', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, drug, time_treated) {
		self.drug = drug;
		self.treatment_recovery_probability = Params.DRUG_PROPERTIES [drug] [0];
		self.time_treated = time_treated;
	});},
	get next_treatment () {return __get__ (this, function (self) {
		var drug_index = Params.DRUG_NAMES.index (self.drug);
		if (drug_index < Params.NUM_RESISTANCES - 1) {
			self.__init__ (Params.DRUG_NAMES [drug_index + 1], self.time_treated);
		}
	});},
	get treats_infection () {return __get__ (this, function (self, infection) {
		return !(infection.is_resistant (self.drug));
	});},
	get duplicate () {return __get__ (this, function (self) {
		return Treatment (self.drug, self.time_treated);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return 'treated with drug {} for {} timesteps'.format (self.drug, self.time_treated);
	});}
});
export var Person =  __class__ ('Person', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, infection, treatment, isolated, immune, time_infected, alive) {
		if (typeof infection == 'undefined' || (infection != null && infection.hasOwnProperty ("__kwargtrans__"))) {;
			var infection = null;
		};
		if (typeof treatment == 'undefined' || (treatment != null && treatment.hasOwnProperty ("__kwargtrans__"))) {;
			var treatment = null;
		};
		if (typeof isolated == 'undefined' || (isolated != null && isolated.hasOwnProperty ("__kwargtrans__"))) {;
			var isolated = false;
		};
		if (typeof immune == 'undefined' || (immune != null && immune.hasOwnProperty ("__kwargtrans__"))) {;
			var immune = false;
		};
		if (typeof time_infected == 'undefined' || (time_infected != null && time_infected.hasOwnProperty ("__kwargtrans__"))) {;
			var time_infected = 0;
		};
		if (typeof alive == 'undefined' || (alive != null && alive.hasOwnProperty ("__kwargtrans__"))) {;
			var alive = true;
		};
		self.infection = infection;
		self.treatment = treatment;
		self.isolated = isolated;
		self.immune = immune;
		self.time_infected = time_infected;
		self.alive = alive;
	});},
	get recover_from_infection () {return __get__ (this, function (self) {
		self.__init__ (null, null, false, true, 0, true);
	});},
	get mutate_infection () {return __get__ (this, function (self) {
		if (self.infection !== null && self.treatment !== null) {
			self.infection.make_resistant (self.treatment.drug);
		}
	});},
	get increase_treatment () {return __get__ (this, function (self) {
		if (self.treatment !== null) {
			self.treatment.next_treatment ();
		}
	});},
	get correct_treatment () {return __get__ (this, function (self) {
		if (self.treatment !== null) {
			return self.treatment.treats_infection (self.infection);
		}
		return false;
	});},
	get try_spread_infection () {return __get__ (this, function (self, population) {
		if (self.infection !== null && decision (self.infection.spread_probability)) {
			for (var receiver of sample (population, self.infection.num_spread_to)) {
				var directional = receiver.infection === null || self.infection.get_tier () > receiver.infection.get_tier ();
				var susceptible = !(receiver.immune) && receiver.alive;
				var contactable = !(self.isolated) && !(receiver.isolated);
				if (directional && susceptible && contactable) {
					receiver.infection = Infection (self.infection.resistance, 0);
				}
			}
		}
	});},
	get isolate () {return __get__ (this, function (self) {
		self.isolated = true;
	});},
	get die () {return __get__ (this, function (self) {
		self.__init__ (null, null, false, false, 0, false);
	});},
	get duplicate () {return __get__ (this, function (self) {
		return Person ((self.infection === null ? null : self.infection.duplicate ()), (self.treatment === null ? null : self.treatment.duplicate ()), self.isolated, self.immune, self.time_infected, self.alive);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (!(self.alive)) {
			return 'Dead person';
		}
		else if (self.immune) {
			return 'Immune person';
		}
		else if (self.infection !== null) {
			if (self.treatment !== null) {
				return 'Person {} and {}'.format (self.infection, self.treatment);
			}
			else {
				return 'Person {} and untreated'.format (self.infection);
			}
		}
		return 'Uninfected person';
	});}
});
export var Model =  __class__ ('Model', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, population) {
		self.population = population;
		self.data_handler = DataHandler ();
	});},
	get run () {return __get__ (this, function (self) {
		for (var _ = 0; _ < Params.NUM_TIMESTEPS; _++) {
			for (var person of self.population) {
				self.data_handler.record_person (person);
				if (!(person.alive)) {
					continue;
				}
				if (person.infection !== null) {
					if (person.treatment === null) {
						person.treatment = Treatment (Params.DRUG_NAMES [0], 0);
					}
					else {
						var time_cond = person.treatment.time_treated > Params.TIMESTEPS_MOVE_UP_LAG_TIME;
						var rand_cond = decision (Params.PROBABILITY_MOVE_UP_TREATMENT);
						if (time_cond && rand_cond) {
							person.increase_treatment ();
						}
						var treatment_tier = Infection.get_tier_from_resistance (person.treatment.drug);
						if (treatment_tier >= Params.ISOLATION_THRESHOLD) {
							person.isolate ();
						}
					}
					if (Params.PRODUCT_IN_USE && decision (Params.PROBABILIY_PRODUCT_DETECT)) {
						if (person.infection.get_tier () >= Params.PRODUCT_DETECTION_LEVEL) {
							person.isolate ();
						}
					}
					var general_recovery = decision (person.infection.general_recovery_probability);
					var treatment_recovery = person.correct_treatment () && decision (person.treatment.treatment_recovery_probability);
					if (general_recovery || treatment_recovery) {
						person.recover_from_infection ();
						continue;
					}
					if (decision (person.infection.mutation_probability)) {
						person.mutate_infection ();
					}
					var death_probability = person.infection.death_function (person.infection.death_probability, person.time_infected);
					if (decision (death_probability)) {
						person.die ();
						continue;
					}
					person.time_infected++;
					person.treatment.time_treated++;
				}
			}
			var updated_population = (function () {
				var __accu0__ = [];
				for (var p of self.population) {
					__accu0__.append (p.duplicate ());
				}
				return __accu0__;
			}) ();
			for (var person of self.population) {
				person.try_spread_infection (updated_population);
			}
			self.population = updated_population.__getslice__ (0, null, 1);
			self.data_handler.process_timestep_data ();
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return 'Model';
	});}
});
export var sample = function (population, k) {
	if (!((0 <= k && k <= len (population)))) {
		var __except0__ = ValueError ('Sample larger than population or is negative');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	var indices = list (range (len (population)));
	var sample = [];
	for (var _ = 0; _ < k; _++) {
		var index = choice (indices);
		indices.remove (index);
		sample.append (population [index]);
	}
	return sample;
};
export var decision = function (probability) {
	return random () < probability;
};
export var DataHandler =  __class__ ('DataHandler', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.time = [];
		self.ys_data = (function () {
			var __accu0__ = [];
			for (var _ = 0; _ < 4 + Params.NUM_RESISTANCES; _++) {
				__accu0__.append ([]);
			}
			return __accu0__;
		}) ();
		self.labels = ['Infected'];
		self.labels.extend ((function () {
			var __accu0__ = [];
			for (var n of Params.DRUG_NAMES) {
				__accu0__.append ('Resistance {}'.format (n));
			}
			return __accu0__;
		}) ());
		self.labels.extend (['Dead', 'Immune', 'Uninfected']);
		self.non_disjoint = [[]];
		self.non_disjoint_labels = ['Isolated'];
		self.timestep = -(1);
		self._new_timestep_vars ();
	});},
	get get_infected_data () {return __get__ (this, function (self) {
		return self.ys_data.__getslice__ (0, Params.NUM_RESISTANCES + 1, 1);
	});},
	get get_death_data () {return __get__ (this, function (self) {
		return self.ys_data [len (self.ys_data) - 3];
	});},
	get get_immune_data () {return __get__ (this, function (self) {
		return self.ys_data [len (self.ys_data) - 2];
	});},
	get get_uninfected_data () {return __get__ (this, function (self) {
		return self.ys_data [len (self.ys_data) - 1];
	});},
	get _new_timestep_vars () {return __get__ (this, function (self) {
		self.num_infected_stages = (function () {
			var __accu0__ = [];
			for (var _ = 0; _ < Params.NUM_RESISTANCES + 1; _++) {
				__accu0__.append (0);
			}
			return __accu0__;
		}) ();
		self.num_dead = 0;
		self.num_immune = 0;
		self.num_uninfected = 0;
		self.num_isolated = 0;
		self.timestep++;
	});},
	get record_person () {return __get__ (this, function (self, person) {
		if (person.immune) {
			self.num_immune++;
		}
		else if (!(person.alive)) {
			self.num_dead++;
		}
		else if (person.infection === null) {
			self.num_uninfected++;
		}
		else {
			self.num_infected_stages [person.infection.get_tier () + 1]++;
		}
		if (person.isolated) {
			self.num_isolated++;
		}
	});},
	get process_timestep_data () {return __get__ (this, function (self) {
		for (var [j, v] of enumerate (self.num_infected_stages)) {
			self.ys_data [j].append (v);
		}
		self.ys_data [len (self.ys_data) - 3].append (self.num_dead);
		self.ys_data [len (self.ys_data) - 2].append (self.num_immune);
		self.ys_data [len (self.ys_data) - 1].append (self.num_uninfected);
		self.non_disjoint [0].append (self.num_isolated);
		self.time.append (self.timestep);
		self._report_model_state ();
		self._new_timestep_vars ();
	});},
	get _print_current_data () {return __get__ (this, function (self) {
		print ('uninfected: {}, immune: {}, dead: {}, infected: {}, isolated: {}'.format (str (self.num_uninfected), str (self.num_immune), str (self.num_dead), ('[' + ', '.join (map ((function __lambda__ (x) {
			return str (x);
		}), self.num_infected_stages))) + ']', str (self.num_isolated)));
	});},
	get _print_current_progress () {return __get__ (this, function (self, end) {
		if (typeof end == 'undefined' || (end != null && end.hasOwnProperty ("__kwargtrans__"))) {;
			var end = '\n';
		};
		var out = '{}% complete'.format (str (int ((self.timestep / int (Params.NUM_TIMESTEPS / 10)) * 10)));
		print (out, __kwargtrans__ ({end: end}));
	});},
	get _report_model_state () {return __get__ (this, function (self) {
		if (Settings.REPORT_MOD_NUM === null || __mod__ (self.timestep, Settings.REPORT_MOD_NUM) == 0) {
			if (Settings.REPORT_PROGRESS && !(Settings.PRINT_DATA)) {
				self._print_current_progress ();
			}
			if (Settings.PRINT_DATA) {
				if (Settings.REPORT_PROGRESS) {
					self._print_current_progress (__kwargtrans__ ({end: ' - '}));
				}
				self._print_current_data ();
			}
		}
	});},
	get generate_data_sets () {return __get__ (this, function (self) {
		return DataRenderer.generate_data_sets (self.time, self.ys_data, self.non_disjoint, self.labels, self.non_disjoint_labels);
	});}
});
export var DataRenderer =  __class__ ('DataRenderer', [object], {
	__module__: __name__,
	get generate_data_sets () {return function (time, ys_data, non_disjoint, labels, non_disjoint_labels) {
		var datas = [];
		for (var i = 0; i < Params.NUM_RESISTANCES + 1; i++) {
			datas.append ((function () {
				var __accu0__ = [];
				for (var x of zip (...ys_data.__getslice__ (i, -(3), 1))) {
					__accu0__.append (sum (x));
				}
				return __accu0__;
			}) ());
		}
		datas.extend (ys_data.__getslice__ (len (ys_data) - 3, null, 1));
		datas.extend (non_disjoint);
		var final_labels = labels;
		final_labels.extend (non_disjoint_labels);
		var colours = DataRenderer.generate_colours (len (final_labels));
		var datasets = (function () {
			var __accu0__ = [];
			for (var i = 0; i < len (datas); i++) {
				__accu0__.append (dict ({'data': datas [i], 'label': final_labels [i], 'borderColor': colours [i], 'fill': false}));
			}
			return __accu0__;
		}) ();
		var chart_data = dict ({'labels': (function () {
			var __accu0__ = [];
			for (var x of time) {
				__accu0__.append (x + 1);
			}
			return __accu0__;
		}) (), 'datasets': datasets});
		return chart_data;
	};},
	get generate_colours () {return function (num_colours) {
		if (num_colours < 1) {
			var num_colours = 1;
		}
		return (function () {
			var __accu0__ = [];
			for (var n = 0; n < num_colours; n++) {
				__accu0__.append ('hsl({}, 40%, 60%)'.format (int (__mod__ (n * (360 / num_colours), 360))));
			}
			return __accu0__;
		}) ();
	};}
});
export var run = function () {
	if (Settings.RANDOM_SEED !== null) {
		seed (Settings.RANDOM_SEED);
	}
	var num_intially_uninfected = Params.POPULATION_SIZE - Params.INITIALLY_INFECTED;
	var population = (function () {
		var __accu0__ = [];
		for (var _ = 0; _ < num_intially_uninfected; _++) {
			__accu0__.append (Person (null, null, false, false, 0, true));
		}
		return __accu0__;
	}) ();
	for (var _ = 0; _ < Params.INITIALLY_INFECTED; _++) {
		population.append (Person (Infection ('None', 0), null, false, false, 0, true));
	}
	var m = Model (population);
	m.run ();
	return m.data_handler.generate_data_sets ();
};
if (__name__ == '__main__') {
	run ();
}

//# sourceMappingURL=model.map