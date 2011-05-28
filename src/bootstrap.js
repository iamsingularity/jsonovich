/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is JSONovich restartless bootstrap.
 *
 * The Initial Developer of the Original Code is
 * William Elwood <we9@kent.ac.uk>.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK *****
 *
 * This file contains the JSONovich bootstrap for Gecko 2+ browsers.
 *
 * Changelog:
 * [2011-05] - Created FF4 restartless bootstrap for JSONovich extension
 */

'use strict';

const {classes: Cc, interfaces: Ci, manager: Cm, results: Cr, utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/AddonManager.jsm");

const ADDON_NAME = 'JSONovich';
const ADDON_LNAME = 'jsonovich';
const ADDON_DOMAIN = 'lackoftalent.org';
const PLATFORM = 'gecko';
let jsonovich, getResourceURI;

function startup(data, reason) {
    AddonManager.getAddonByID(data.id, function(addon) {
        getResourceURI = function getResourceURI(path) {
            return addon.getResourceURI(path);
        }
        jsonovich = {};
        Services.scriptloader.loadSubScript(getResourceURI('modules/' + PLATFORM + '/helper.js').spec, jsonovich);
        if(jsonovich.startup) {
            jsonovich.startup();
        }
    });
}

function shutdown(data, reason) {
    if(reason == ADDON_UNINSTALL && jsonovich.uninstall) {
        jsonovich.uninstall();
    }
    if(reason != APP_SHUTDOWN && jsonovich.shutdown) {
        jsonovich.shutdown();
    }
    jsonovich = null;
}

function install(data, reason) {}
function uninstall(data, reason) {}
